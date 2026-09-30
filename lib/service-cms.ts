import "server-only";

import { servicesData, type ServiceCategory, type ServiceDetail } from "@/data/services";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const serviceImageFallbacks: Record<string, string> = {
  "medico-ocupacional-planta": "/medical_training.png",
  "salud-ocupacional-ds005": "/sst_training.png",
  "monitoreo-higiene-ds055": "/vigmedical_team.png",
  "ergonomia-rm375": "/about_team.png",
  "auditoria-seguridad-sso": "/sst_training.png",
  "equipos-proteccion-personal": "/vigmedical_team.png",
  "consulta-medica-domicilio": "/medical_training.png",
  "enfermeria-cuidados-casa": "/about_team.png",
};

export async function getManagedServices(): Promise<ServiceCategory[]> {
  const categories = servicesData.map((category) => ({
    ...category,
    details: category.details.map((service) => ({ ...service, items: [...service.items] })),
  }));
  try {
    const { data, error } = await getSupabaseAdmin().from("service_content").select("id,title,description,items,storage_path");
    if (error || !data) return categories;
    const overrides = new Map(data.map((item) => [item.id, item]));
    categories.forEach((category) => category.details.forEach((service) => {
      const override = overrides.get(service.id);
      if (!override) return;
      service.title = override.title;
      service.description = override.description;
      if (Array.isArray(override.items)) service.items = override.items.filter((item): item is string => typeof item === "string");
      if (override.storage_path) service.image = `/api/media/service/${service.id}`;
    }));
  } catch {}
  return categories;
}

export async function getManagedService(id: string): Promise<ServiceDetail | undefined> {
  return (await getManagedServices()).flatMap((category) => category.details).find((service) => service.id === id);
}
