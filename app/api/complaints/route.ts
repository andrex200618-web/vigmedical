import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { company } from "@/data/company";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_768;
type ComplaintPayload = Record<string, unknown>;

function jsonError(message: string, status: number, retryAfter?: number) {
  const response = NextResponse.json({ ok: false, message }, { status });
  response.headers.set("Cache-Control", "no-store");
  if (retryAfter) response.headers.set("Retry-After", String(retryAfter));
  return response;
}

function text(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, maxLength);
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", body, signal: AbortSignal.timeout(5_000), cache: "no-store",
    });
    if (!response.ok) return false;
    return ((await response.json()) as { success?: boolean }).success === true;
  } catch { return false; }
}

export async function POST(request: NextRequest) {
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) return jsonError("Formato de solicitud no válido.", 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return jsonError("La solicitud es demasiado grande.", 413);
  if (request.headers.get("origin") !== request.nextUrl.origin) return jsonError("Solicitud no autorizada.", 403);

  const provider = {
    legalName: company.legalName,
    ruc: company.ruc,
    address: company.address,
  };

  const ip = clientIp(request);
  let supabase: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabase = getSupabaseAdmin();
    const secret = process.env.RATE_LIMIT_SECRET;
    if (!secret || secret.length < 32) throw new Error("Invalid rate-limit secret");
    const identifier = createHmac("sha256", secret).update(`complaint:${ip}`).digest("hex");
    const { data, error } = await supabase.rpc("check_contact_rate_limit", {
      p_identifier: identifier, p_window_seconds: 3_600, p_max_requests: 3,
    });
    if (error || !Array.isArray(data) || !data[0]) throw error || new Error("Invalid rate-limit response");
    const limit = data[0] as { allowed: boolean; retry_after: number };
    if (!limit.allowed) return jsonError("Has realizado demasiados intentos. Inténtalo nuevamente más tarde.", 429, limit.retry_after);
  } catch (error) {
    console.error("Complaints book protection unavailable", { cause: error instanceof Error ? error.name : "UnknownError" });
    return jsonError("El Libro de Reclamaciones no está disponible temporalmente.", 503);
  }

  let payload: ComplaintPayload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return jsonError("La solicitud es demasiado grande.", 413);
    payload = JSON.parse(raw) as ComplaintPayload;
  } catch { return jsonError("No se pudo procesar la solicitud.", 400); }

  if (text(payload.website, 200)) return NextResponse.json({ ok: true }, { status: 200 });
  const isMinor = payload.isMinor === true;
  const complaint = {
    consumer_name: text(payload.consumerName, 160), document_type: text(payload.documentType, 10),
    document_number: text(payload.documentNumber, 20), consumer_address: text(payload.consumerAddress, 300),
    phone: text(payload.phone, 20), email: text(payload.email, 254).toLowerCase(), is_minor: isMinor,
    guardian_name: isMinor ? text(payload.guardianName, 160) : null,
    guardian_document: isMinor ? text(payload.guardianDocument, 20) : null,
    item_type: text(payload.itemType, 10), item_description: text(payload.itemDescription, 300),
    amount: Number(payload.amount), complaint_type: text(payload.complaintType, 10), detail: text(payload.detail, 3_000),
    consumer_request: text(payload.consumerRequest, 2_000), provider_legal_name: provider.legalName,
    provider_ruc: provider.ruc, provider_address: provider.address,
  };

  if (
    complaint.consumer_name.length < 3 || !["DNI", "CE", "PASAPORTE", "RUC"].includes(complaint.document_type) ||
    complaint.document_number.length < 6 || complaint.consumer_address.length < 8 ||
    !/^\+?[0-9\s-]{7,15}$/.test(complaint.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(complaint.email) ||
    !["PRODUCTO", "SERVICIO"].includes(complaint.item_type) || !["RECLAMO", "QUEJA"].includes(complaint.complaint_type) ||
    complaint.item_description.length < 3 || !Number.isFinite(complaint.amount) || complaint.amount < 0 ||
    complaint.detail.length < 10 || complaint.consumer_request.length < 5 ||
    (isMinor && (!complaint.guardian_name || !complaint.guardian_document)) || payload.acceptedTerms !== true
  ) return jsonError("Revisa los campos obligatorios e inténtalo nuevamente.", 400);

  if (!(await verifyTurnstile(text(payload.turnstileToken, 2_048), ip))) return jsonError("No pudimos validar que eres una persona. Recarga la página e inténtalo nuevamente.", 400);

  try {
    const { data, error } = await supabase.from("complaints").insert(complaint).select("tracking_code, created_at").single();
    if (error || !data) throw error || new Error("Complaint was not persisted");
    const response = NextResponse.json({ ok: true, code: data.tracking_code, submittedAt: data.created_at, provider }, { status: 201 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Complaint storage failed", { cause: error instanceof Error ? error.name : "UnknownError" });
    return jsonError("No pudimos registrar la hoja. Inténtalo nuevamente más tarde.", 503);
  }
}
