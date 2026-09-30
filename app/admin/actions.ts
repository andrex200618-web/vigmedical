"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { getSupabaseAuthClient, isSupabaseAuthConfigured } from "@/lib/supabase-auth";
import { isMediaAssetKey } from "@/lib/media-assets";
import { servicesData } from "@/data/services";

export type LoginState = { error?: string };

export async function loginAdmin(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
    return { error: "Ingresa credenciales válidas." };
  }
  if (!isSupabaseAuthConfigured()) {
    return { error: "El acceso administrativo aún no está conectado a Supabase." };
  }

  const supabase = await getSupabaseAuthClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || data.user?.app_metadata?.role !== "admin") {
    if (data.session) await supabase.auth.signOut();
    return { error: "Correo o contraseña incorrectos." };
  }
  redirect("/admin");
}

export async function logoutAdmin() {
  if (!isSupabaseAuthConfigured()) redirect("/admin/login");
  const supabase = await getSupabaseAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateContactStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isSafeInteger(id) || !["NUEVO", "EN_PROCESO", "ATENDIDO"].includes(status)) return;

  const { error } = await getSupabaseAdmin()
    .from("contact_messages")
    .update({ status, handled_at: status === "ATENDIDO" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw new Error("No se pudo actualizar el contacto.");
  revalidatePath("/admin");
}

export async function updateComplaint(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  const providerActions = String(formData.get("providerActions") ?? "").trim().slice(0, 3000);
  if (!Number.isSafeInteger(id) || !["PENDIENTE", "EN_PROCESO", "RESPONDIDO"].includes(status)) return;
  if (status === "RESPONDIDO" && providerActions.length < 5) {
    throw new Error("Registra las acciones del proveedor antes de responder.");
  }

  const { error } = await getSupabaseAdmin()
    .from("complaints")
    .update({
      status,
      provider_actions: providerActions || null,
      responded_at: status === "RESPONDIDO" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw new Error("No se pudo actualizar la reclamación.");
  revalidatePath("/admin");
}

const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

export async function updateSiteImage(formData: FormData) {
  const user = await requireAdmin();
  const key = String(formData.get("key") ?? "");
  const file = formData.get("image");
  if (!isMediaAssetKey(key) || !(file instanceof File) || file.size === 0) {
    throw new Error("Selecciona una imagen válida.");
  }
  const extension = allowedImageTypes.get(file.type);
  if (!extension || file.size > 5 * 1024 * 1024) {
    throw new Error("La imagen debe ser JPG, PNG, WebP o AVIF y pesar como máximo 5 MB.");
  }

  const supabase = getSupabaseAdmin();
  const { data: current } = await supabase
    .from("media_assets")
    .select("storage_path")
    .eq("key", key)
    .maybeSingle();
  const storagePath = `${key}/${Date.now()}.${extension}`;
  const bytes = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("site-images")
    .upload(storagePath, bytes, { contentType: file.type, cacheControl: "31536000", upsert: false });
  if (uploadError) throw new Error("No se pudo subir la imagen.");

  const { error: updateError } = await supabase
    .from("media_assets")
    .update({ storage_path: storagePath, updated_at: new Date().toISOString(), updated_by: user.id })
    .eq("key", key);
  if (updateError) {
    await supabase.storage.from("site-images").remove([storagePath]);
    throw new Error("No se pudo publicar la imagen.");
  }
  if (current?.storage_path) {
    await supabase.storage.from("site-images").remove([current.storage_path]);
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}

export async function updateServiceContent(formData: FormData) {
  const user = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const localService = servicesData.flatMap((category) => category.details).find((service) => service.id === id);
  if (!localService) throw new Error("Servicio no válido.");
  const title = String(formData.get("title") ?? "").trim().slice(0, 160);
  const description = String(formData.get("description") ?? "").trim().slice(0, 2000);
  const items = String(formData.get("items") ?? "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 20);
  if (title.length < 3 || description.length < 10 || items.length === 0) throw new Error("Completa el título, descripción y alcance.");

  const supabase = getSupabaseAdmin();
  const { data: current } = await supabase.from("service_content").select("storage_path").eq("id", id).maybeSingle();
  let storagePath = current?.storage_path ?? null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const extension = allowedImageTypes.get(file.type);
    if (!extension || file.size > 5 * 1024 * 1024) throw new Error("La foto debe ser JPG, PNG, WebP o AVIF y pesar máximo 5 MB.");
    const nextPath = `services/${id}/${Date.now()}.${extension}`;
    const { error } = await supabase.storage.from("site-images").upload(nextPath, await file.arrayBuffer(), { contentType: file.type, cacheControl: "31536000" });
    if (error) throw new Error("No se pudo subir la foto del servicio.");
    storagePath = nextPath;
  }

  const { error } = await supabase.from("service_content").upsert({ id, title, description, items, storage_path: storagePath, updated_at: new Date().toISOString(), updated_by: user.id });
  if (error) {
    if (storagePath && storagePath !== current?.storage_path) await supabase.storage.from("site-images").remove([storagePath]);
    throw new Error("No se pudo guardar el servicio.");
  }
  if (current?.storage_path && storagePath !== current.storage_path) await supabase.storage.from("site-images").remove([current.storage_path]);
  revalidatePath("/", "layout");
  revalidatePath("/servicios");
  revalidatePath(`/servicios/${id}`);
  revalidatePath("/admin");
}
