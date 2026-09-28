import { test, expect } from "@playwright/test";

const ROUTES = [
  "/",
  "/services",
  "/products",
  "/about",
  "/contact",
  "/blog",
  "/faq",
  "/privacy",
  "/terms",
];

test.describe("all routes", () => {
  for (const route of ROUTES) {
    test(`${route} responds 200 with no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(String(e)));
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      // let hydration settle before judging the console
      await page.waitForTimeout(800);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});

test.describe("reveal stability across repeated navigation", () => {
  // GSAP leak regression: re-mounting StaggerGroup/Reveal on repeat visits must not
  // double-register ScrollTriggers or leave elements stuck hidden.
  // 18 navigations × 3 scroll-and-settle passes — the default 30s is not enough.
  test.setTimeout(120_000);
  test("Home→Services→Products→About→Contact→Home ×3 reveals cleanly", async ({ page }) => {
    const cycle = ["/", "/services", "/products", "/about", "/contact", "/"];
    for (let i = 0; i < 3; i++) {
      for (const route of cycle) {
        await page.goto(route, { waitUntil: "networkidle" });
        if (route !== "/") continue;
        await page.evaluate(async () => {
          document.documentElement.style.scrollBehavior = "auto";
          for (let y = 0; y <= document.body.scrollHeight; y += 400) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
        });
        // Motion spec v2: 0.8s reveals + 80ms stagger — the last batch item
        // can still be ~0.999 opaque when the v1-era 900ms settle elapsed.
        await page.waitForTimeout(2400);
        const hidden = await page.evaluate(
          () =>
            [...document.querySelectorAll("[data-reveal]")].filter(
              (el) => Number(getComputedStyle(el).opacity) < 1,
            ).length,
        );
        expect(hidden, `cycle ${i + 1}: ${hidden} unrevealed element(s)`).toBe(0);
      }
    }
  });
});
