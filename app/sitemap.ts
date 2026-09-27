import type { MetadataRoute } from "next";
import { SITEMAP_ROUTES, siteUrl } from "@/lib/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return SITEMAP_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
