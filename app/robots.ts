import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data/seo";

// Required for output: export (route handlers must be explicitly static).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dev", "/api/"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
