import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { isMediaAssetKey, mediaAssets } from "@/lib/media-assets";

type Props = { params: Promise<{ key: string }> };

const mimeTypes: Record<string, string> = {
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

function imageResponse(body: BodyInit, contentType: string) {
  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(_request: Request, { params }: Props) {
  const { key } = await params;
  if (!isMediaAssetKey(key)) return new NextResponse("Not found", { status: 404 });
  const fallback = mediaAssets.find((item) => item.key === key)!.fallbackPath;

  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("media_assets")
      .select("storage_path")
      .eq("key", key)
      .maybeSingle();
    if (data?.storage_path) {
      const { data: publicFile } = supabase.storage.from("site-images").getPublicUrl(data.storage_path);
      const storedImage = await fetch(publicFile.publicUrl, { cache: "no-store" });
      if (storedImage.ok) {
        return imageResponse(
          await storedImage.arrayBuffer(),
          storedImage.headers.get("content-type") || "application/octet-stream",
        );
      }
    }
  } catch {
    // La imagen local mantiene el sitio operativo antes de configurar Supabase.
  }

  const filePath = path.join(process.cwd(), "public", ...fallback.split("/").filter(Boolean));
  const localImage = await readFile(filePath);
  return imageResponse(localImage, mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream");
}
