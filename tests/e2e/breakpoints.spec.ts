import { test, expect } from "@playwright/test";

test.describe("breakpoints", () => {
  test("759px: hamburger shown, nav hidden, 22px gutters", async ({ page }) => {
    await page.setViewportSize({ width: 759, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page.locator("header nav")).toBeHidden();
    const gutter = await page.evaluate(
      () => getComputedStyle(document.querySelector(".container-dc")!).paddingLeft,
    );
    expect(gutter).toBe("22px");
  });

  test("760px: nav shown, hamburger hidden, 40px gutters", async ({ page }) => {
    await page.setViewportSize({ width: 760, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("header nav")).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    const gutter = await page.evaluate(
      () => getComputedStyle(document.querySelector(".container-dc")!).paddingLeft,
    );
    expect(gutter).toBe("40px");
  });
});
