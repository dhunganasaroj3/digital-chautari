import { describe, expect, it } from "vitest";
import * as site from "@/lib/data/site";
import * as home from "@/lib/data/home";
import * as services from "@/lib/data/services";
import * as products from "@/lib/data/products";
import * as about from "@/lib/data/about";
import * as contact from "@/lib/data/contact";
import { SITEMAP_ROUTES } from "@/lib/data/seo";

const MODULES = [site, home, services, products, about, contact];

/** Deep-walks a value and returns every `href` string that starts with "/". */
function collectHrefs(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") return out;
  if (Array.isArray(value)) {
    for (const item of value) collectHrefs(item, out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key === "href" && typeof child === "string" && child.startsWith("/")) out.push(child);
      else collectHrefs(child, out);
    }
  }
  return out;
}

describe("internal links", () => {
  it("every internal href points at a sitemap route (anchors allowed)", () => {
    const hrefs = MODULES.flatMap((module) => collectHrefs(module));
    expect(hrefs.length).toBeGreaterThan(10);
    const dead = hrefs.filter((href) => {
      const base = href.split("#")[0]?.replace(/\/$/, "") ?? "";
      return !SITEMAP_ROUTES.includes(base as (typeof SITEMAP_ROUTES)[number]);
    });
    expect(dead).toEqual([]);
  });

  it("sitemap covers exactly the 9 crawlable routes", () => {
    expect(SITEMAP_ROUTES).toHaveLength(9);
    expect(SITEMAP_ROUTES).toContain("");
  });
});
