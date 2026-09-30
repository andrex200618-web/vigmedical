import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://vigmedical.com/sitemap.xml",
    host: "https://vigmedical.com",
  };
}
