import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", gradient: "digital bridges" },
  { path: "/services", gradient: "drive growth" },
  { path: "/products", gradient: "one vision" },
  { path: "/about", gradient: "people behind" },
  { path: "/contact", gradient: "conversation" },
];

test("all 5 nav pages resolve 200 and their h1 carries the gradient words", async ({ page }) => {
  for (const { path, gradient } of PAGES) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(gradient);
  }
});

test("ancillary routes resolve 200", async ({ page }) => {
  for (const path of ["/blog", "/faq", "/privacy", "/terms"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
  }
});

test("unknown route renders the branded 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "This chautari doesn't exist",
  );
});
