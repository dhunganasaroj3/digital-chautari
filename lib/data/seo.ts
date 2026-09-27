/** SEO payloads + per-page OG helper (S3.9/S3.10). URLs are swapped to the real domain in Sprint 4. */

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Chautari",
  description:
    "Creative technology company in Kathmandu, Nepal — digital marketing, content creation, and health-tech software.",
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  foundingDate: "2025",
  email: "hello@digitalchautari.com.np",
  sameAs: [] as string[], // ⟨TBC⟩ social profiles
};

export const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Digital Chautari",
  url: "http://localhost:3000",
};

/** Self-contained openGraph object so pages don't rely on deep metadata merging. */
export function pageOpenGraph(title: string) {
  return {
    type: "website" as const,
    siteName: "Digital Chautari",
    images: [`/api/og?title=${encodeURIComponent(title)}`],
  };
}

/** Every crawlable route; "" is the home page. Swapped domain comes from NEXT_PUBLIC_SITE_URL. */
export const SITEMAP_ROUTES = [
  "",
  "/services",
  "/products",
  "/about",
  "/contact",
  "/blog",
  "/faq",
  "/privacy",
  "/terms",
] as const;

export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
