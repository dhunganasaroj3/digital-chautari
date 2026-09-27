import { expect, test } from "@playwright/test";

test("product tabs switch by click and keyboard", async ({ page }) => {
  await page.goto("/products");
  const eco = page.getByRole("tab", { name: "Eco Creative Marketing Agency" });
  const one = page.getByRole("tab", { name: "One Content Creation Studio" });
  const physio = page.getByRole("tab", { name: "Physio@Home" });

  await expect(eco).toHaveAttribute("aria-selected", "true");

  // retry the first click: it can land before React hydration on a cold dev server
  await expect(async () => {
    await one.click();
    await expect(one).toHaveAttribute("aria-selected", "true");
  }).toPass({ timeout: 15_000 });
  await expect(page.getByRole("tabpanel")).toContainText("One Content Creation Studio");

  await one.press("ArrowRight");
  await expect(physio).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Physio@Home");

  await physio.press("Home");
  await expect(eco).toHaveAttribute("aria-selected", "true");
});

test("?product=physio deep-links to the third tab", async ({ page }) => {
  await page.goto("/products?product=physio");
  await expect(page.getByRole("tab", { name: "Physio@Home" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText("Physio@Home");
});
