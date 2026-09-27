import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dev", "/api/"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
