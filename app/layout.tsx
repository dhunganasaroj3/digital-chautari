import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Digital Chautari — Creative Technology Company",
    template: "%s — Digital Chautari",
  },
  description:
    "Digital Chautari is a creative technology company in Kathmandu, Nepal — blending digital marketing, content creation, and health-tech software to turn ambitious ideas into measurable impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="focus:rounded-btn focus:bg-action focus:text-on-action sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
