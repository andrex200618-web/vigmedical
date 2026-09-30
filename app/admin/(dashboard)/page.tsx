import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, ImageIcon, Inbox, LogOut, MessageSquareWarning, Upload } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { mediaAssets, managedMediaUrl } from "@/lib/media-assets";
import { servicesData } from "@/data/services";
import { logoutAdmin, updateComplaint, updateContactStatus, updateServiceContent, updateSiteImage } from "../actions";

export const metadata: Metadata = { title: "Administración | Vigmedical", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ view?: string }> };
const formatDate = (value: string) => new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export default async function AdminPage({ searchParams }: Props) {
  const user = await requireAdmin();
  const requestedView = (await searchParams).view;
  const view = requestedView === "complaints" || requestedView === "media" || requestedView === "services" ? requestedView : "contacts";
  const supabase = getSupabaseAdmin();
  const [{ data: contacts, count: contactsCount }, { data: complaints, count: complaintsCount }, { data: storedMedia }, { data: storedServices }] = await Promise.all([
    supabase.from("contact_messages").select("*", { count: "exact" }).order("created_at", { ascending: false }).limit(100),
    supabase.from("complaints").select("*", { count: "exact" }).order("created_at", { ascending: false }).limit(100),
    supabase.from("media_assets").select("key, updated_at, storage_path"),
    supabase.from("service_content").select("id,title,description,items,storage_path,updated_at"),
  ]);

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-widest text-primary-600">Vigmedical</p><h1 className="text-3xl font-extrabold text-slate-950">Panel administrativo</h1><p className="text-sm text-slate-500">Sesión: {user.email}</p></div>
          <form action={logoutAdmin}><button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700"><LogOut size={16} />Cerrar sesión</button></form>
        </div>
        <nav className="mb-6 flex flex-wrap gap-3" aria-label="Secciones administrativas">
          <Link href="/admin?view=contacts" className={`flex items-center gap-2 rounded-xl px-4 py-3 font-bold ${view === "contacts" ? "bg-primary-600 text-white" : "bg-white text-slate-700"}`}><Inbox size={18} />Contactos ({contactsCount ?? 0})</Link>
          <Link href="/admin?view=complaints" className={`flex items-center gap-2 rounded-xl px-4 py-3 font-bold ${view === "complaints" ? "bg-primary-600 text-white" : "bg-white text-slate-700"}`}><MessageSquareWarning size={18} />Reclamaciones ({complaintsCount ?? 0})</Link>
          <Link href="/admin?view=media" className={`flex items-center gap-2 rounded-xl px-4 py-3 font-bold ${view === "media" ? "bg-primary-600 text-white" : "bg-white text-slate-700"}`}><ImageIcon size={18} />Imágenes</Link>
          <Link href="/admin?view=services" className={`flex items-center gap-2 rounded-xl px-4 py-3 font-bold ${view === "services" ? "bg-primary-600 text-white" : "bg-white text-slate-700"}`}><BriefcaseBusiness size={18} />Servicios</Link>
        </nav>

        {view === "services" ? (
          <div className="space-y-5">
            {servicesData.flatMap((category) => category.details).map((service) => {
              const stored = storedServices?.find((item) => item.id === service.id);
              const title = stored?.title ?? service.title;
              const description = stored?.description ?? service.description;
              const items = Array.isArray(stored?.items) ? stored.items.join("\n") : service.items.join("\n");
              const image = stored?.storage_path ? `/api/media/service/${service.id}?v=${stored.updated_at}` : service.image;
              return <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <form action={updateServiceContent} className="grid gap-5 lg:grid-cols-[220px_1fr]"><input type="hidden" name="id" value={service.id} />
                  <div><div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"><Image src={image} alt={title} fill unoptimized className="object-cover" /></div><label className="mt-3 block text-xs font-bold text-slate-600">Cambiar foto<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/avif" className="mt-1 block w-full text-xs" /></label></div>
                  <div className="space-y-3"><label className="block text-xs font-bold text-slate-600">Título<input name="title" defaultValue={title} maxLength={160} required className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm" /></label><label className="block text-xs font-bold text-slate-600">Descripción<textarea name="description" defaultValue={description} rows={3} maxLength={2000} required className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm" /></label><label className="block text-xs font-bold text-slate-600">Alcance — una actividad por línea<textarea name="items" defaultValue={items} rows={5} required className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm" /></label><button className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-bold text-white">Guardar servicio</button></div>
                </form>
              </article>;
            })}
          </div>
        ) : view === "media" ? (
          <div>
            <div className="mb-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">Formatos permitidos: JPG, PNG, WebP y AVIF. Tamaño máximo: 5 MB. La nueva imagen reemplaza el uso de la anterior en todo el sitio.</div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {mediaAssets.map((asset) => {
                const stored = storedMedia?.find((item) => item.key === asset.key);
                return <article key={asset.key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-video bg-slate-100">
                    <Image src={`${managedMediaUrl(asset.key)}?v=${stored?.updated_at ?? "local"}`} alt={asset.label} fill sizes="(max-width: 768px) 100vw, 33vw" unoptimized className="object-contain" />
                  </div>
                  <div className="p-5"><h2 className="font-extrabold text-slate-900">{asset.label}</h2><p className="mt-1 text-xs text-slate-500">{stored?.storage_path ? `Actualizada: ${formatDate(stored.updated_at)}` : "Usando imagen local de respaldo"}</p>
                    <form action={updateSiteImage} className="mt-4 space-y-3"><input type="hidden" name="key" value={asset.key} /><label className="block text-xs font-bold text-slate-600">Seleccionar nueva imagen<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/avif" required className="mt-1 block w-full rounded-lg border border-slate-200 p-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-bold" /></label><button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"><Upload size={16} />Subir y publicar</button></form>
                  </div>
                </article>;
              })}
            </div>
          </div>
        ) : view === "contacts" ? (
          <div className="space-y-4">{contacts?.length ? contacts.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-4 md:flex-row"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-extrabold text-slate-900">{item.nombres} {item.apellidos}</h2><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold">{item.status}</span></div><p className="mt-1 text-sm text-slate-500">{item.email} · {item.telefono} · {formatDate(item.created_at)}</p><p className="mt-4 whitespace-pre-wrap text-sm text-slate-700">{item.mensaje}</p></div><form action={updateContactStatus} className="flex shrink-0 items-end gap-2"><input type="hidden" name="id" value={item.id} /><label className="text-xs font-bold text-slate-600">Estado<select name="status" defaultValue={item.status} className="mt-1 block rounded-lg border border-slate-200 p-2 text-sm"><option value="NUEVO">Nuevo</option><option value="EN_PROCESO">En proceso</option><option value="ATENDIDO">Atendido</option></select></label><button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white">Guardar</button></form></div></article>) : <p className="rounded-2xl bg-white p-8 text-center text-slate-500">No hay contactos.</p>}</div>
        ) : (
          <div className="space-y-4">{complaints?.length ? complaints.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center gap-2"><h2 className="font-extrabold text-slate-900">{item.tracking_code} · {item.consumer_name}</h2><span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700">{item.complaint_type}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold">{item.status}</span></div><p className="mt-1 text-sm text-slate-500">{item.email} · {item.phone} · {formatDate(item.created_at)}</p><div className="mt-4 grid gap-4 text-sm md:grid-cols-2"><p><strong>Producto/servicio:</strong><br />{item.item_description}</p><p><strong>Monto:</strong><br />S/ {Number(item.amount).toFixed(2)}</p><p><strong>Detalle:</strong><br />{item.detail}</p><p><strong>Pedido:</strong><br />{item.consumer_request}</p></div><form action={updateComplaint} className="mt-5 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-[180px_1fr_auto] md:items-end"><input type="hidden" name="id" value={item.id} /><label className="text-xs font-bold text-slate-600">Estado<select name="status" defaultValue={item.status} className="mt-1 block w-full rounded-lg border border-slate-200 p-2 text-sm"><option value="PENDIENTE">Pendiente</option><option value="EN_PROCESO">En proceso</option><option value="RESPONDIDO">Respondido</option></select></label><label className="text-xs font-bold text-slate-600">Acciones o respuesta del proveedor<textarea name="providerActions" defaultValue={item.provider_actions ?? ""} rows={3} maxLength={3000} className="mt-1 block w-full rounded-lg border border-slate-200 p-2 text-sm" /></label><button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">Guardar</button></form></article>) : <p className="rounded-2xl bg-white p-8 text-center text-slate-500">No hay reclamaciones.</p>}</div>
        )}
      </div>
    </section>
  );
}
