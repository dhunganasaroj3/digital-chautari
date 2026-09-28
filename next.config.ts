import type { NextConfig } from "next";

// Static-export mode (GitHub Pages): enabled by the deploy workflow via
// NEXT_PUBLIC_STATIC_EXPORT=1. Server-only features (security headers) are
// gated off; basePath pins asset/link URLs to the Pages project URL.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  // trailingSlash makes the export emit about/index.html — GitHub Pages
  // resolves directory URLs without server-side rewrites.
  ...(isStaticExport
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
