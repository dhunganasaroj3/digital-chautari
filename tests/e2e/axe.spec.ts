import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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

test.describe("axe accessibility scan", () => {
  for (const route of ROUTES) {
    test(`${route} has no axe violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      // fire every reveal so visibility-dependent rules see the final state
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        for (let y = 0; y <= document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200); // smoother inertia + fades fully settle
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.nodes
            .map((n) => n.target.join(" "))
            .slice(0, 5)
            .join(" | ")}`,
      );
      expect(violations, violations.join("\n")).toEqual([]);
    });
  }
});
