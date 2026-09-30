import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { trainingsData } from "@/data/trainings";

const baseUrl = "https://vigmedical.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/servicios", "/capacitaciones", "/normas-legales", "/nosotros", "/contactanos", "/terminos-y-condiciones", "/politica-de-privacidad", "/libro-de-reclamaciones"];
  return [
    ...staticPaths.map((path, index) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.7 })),
    ...servicesData.flatMap((category) => category.details).map((service) => ({ url: `${baseUrl}/servicios/${service.id}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...trainingsData.map((course) => ({ url: `${baseUrl}/capacitaciones/${course.id}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
