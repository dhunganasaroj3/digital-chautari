import type { MetadataRoute } from "next";
import { SITEMAP_ROUTES, siteUrl } from "@/lib/data/seo";

// Required for output: export (route handlers must be explicitly static).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return SITEMAP_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
