export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Chautari",
  description:
    "Digital marketing, content creation, and health-tech software from Kathmandu, Nepal.",
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  foundingDate: "2025",
  email: "hello@digitalchautari.com.np",
  sameAs: [] as string[], // ⟨TBC⟩ social profiles
};

// Reads NEXT_PUBLIC_SITE_URL; localhost fallback covers dev.
export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Digital Chautari",
  url: siteUrl(),
};

// og.png is the committed render of the retired /api/og route's markup
// (extensionless convention files get served as application/octet-stream on
// GitHub Pages). Root-relative — Next prefixes basePath automatically.
export function pageOpenGraph(title: string) {
  return {
    type: "website" as const,
    siteName: "Digital Chautari",
    title,
    images: ["/og.png"],
  };
}

// "" is the home route.
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
