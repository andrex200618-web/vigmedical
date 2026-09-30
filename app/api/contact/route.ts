import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
  nombres?: unknown;
  apellidos?: unknown;
  email?: unknown;
  telefono?: unknown;
  mensaje?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
  privacyAccepted?: unknown;
};

function jsonError(message: string, status: number, retryAfter?: number) {
  const response = NextResponse.json({ ok: false, message }, { status });
  response.headers.set("Cache-Control", "no-store");
  if (retryAfter) response.headers.set("Retry-After", String(retryAfter));
  return response;
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hashClientIp(ip: string) {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("RATE_LIMIT_SECRET is not configured securely");
  }
  return createHmac("sha256", secret).update(ip).digest("hex");
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, maxLength);
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        signal: AbortSignal.timeout(5_000),
        cache: "no-store",
      },
    );
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonError("Formato de solicitud no válido.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonError("La solicitud es demasiado grande.", 413);
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return jsonError("Solicitud no autorizada.", 403);
  }

  const ip = getClientIp(request);
  let supabase: ReturnType<typeof getSupabaseAdmin>;
  let rateLimit: { allowed: boolean; retry_after: number };
  try {
    supabase = getSupabaseAdmin();
    const identifier = hashClientIp(ip);
    const { data, error } = await supabase.rpc("check_contact_rate_limit", {
      p_identifier: identifier,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      p_max_requests: RATE_LIMIT_MAX_REQUESTS,
    });
    if (error || !Array.isArray(data) || !data[0]) throw error || new Error("Invalid rate-limit response");
    rateLimit = data[0] as { allowed: boolean; retry_after: number };
  } catch (error) {
    console.error("Contact form protection unavailable", {
      cause: error instanceof Error ? error.name : "UnknownError",
    });
    return jsonError("El formulario no está disponible temporalmente. Inténtalo más tarde.", 503);
  }

  if (!rateLimit.allowed) {
    return jsonError(
      "Has realizado demasiados intentos. Inténtalo nuevamente más tarde.",
      429,
      Math.max(1, rateLimit.retry_after),
    );
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonError("La solicitud es demasiado grande.", 413);
    }
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return jsonError("No se pudo procesar la solicitud.", 400);
  }

  // Campo honeypot: los navegadores normales nunca deben completarlo.
  if (cleanText(payload.website, 200)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const contact = {
    nombres: cleanText(payload.nombres, 80),
    apellidos: cleanText(payload.apellidos, 80),
    email: cleanText(payload.email, 254).toLowerCase(),
    telefono: cleanText(payload.telefono, 20),
    mensaje: cleanText(payload.mensaje, 2_000),
  };

  if (
    contact.nombres.length < 2 ||
    contact.apellidos.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) ||
    !/^\+?[0-9\s-]{7,15}$/.test(contact.telefono) ||
    contact.mensaje.length < 10 ||
    payload.privacyAccepted !== true
  ) {
    return jsonError("Revisa los datos ingresados e inténtalo nuevamente.", 400);
  }

  const turnstileToken = cleanText(payload.turnstileToken, 2_048);
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return jsonError("No pudimos validar que eres una persona. Recarga la página e inténtalo nuevamente.", 400);
  }

  try {
    const { error } = await supabase.from("contact_messages").insert(contact);
    if (error) throw error;
  } catch (error) {
    console.error("Contact form storage failed", {
      cause: error instanceof Error ? error.name : "UnknownError",
    });
    return jsonError("No pudimos enviar tu mensaje. Inténtalo nuevamente más tarde.", 503);
  }

  const response = NextResponse.json({ ok: true }, { status: 201 });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
