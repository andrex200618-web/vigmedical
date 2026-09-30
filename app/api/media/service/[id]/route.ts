import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { servicesData } from "@/data/services";
import { serviceImageFallbacks } from "@/lib/service-cms";
import { getSupabaseAdmin } from "@/lib/supabase-server";

type Props = { params: Promise<{ id: string }> };
const mime: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif" };
const validIds = new Set(servicesData.flatMap((category) => category.details.map((service) => service.id)));

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  if (!validIds.has(id)) return new NextResponse("Not found", { status: 404 });
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.from("service_content").select("storage_path").eq("id", id).maybeSingle();
    if (data?.storage_path) {
      const publicUrl = supabase.storage.from("site-images").getPublicUrl(data.storage_path).data.publicUrl;
      const image = await fetch(publicUrl, { cache: "no-store" });
      if (image.ok) return new NextResponse(await image.arrayBuffer(), { headers: { "Content-Type": image.headers.get("content-type") || "application/octet-stream", "Cache-Control": "no-store" } });
    }
  } catch {}
  const fallback = serviceImageFallbacks[id];
  const file = path.join(process.cwd(), "public", fallback.slice(1));
  return new NextResponse(await readFile(file), { headers: { "Content-Type": mime[path.extname(file)] || "image/png", "Cache-Control": "no-store" } });
}
