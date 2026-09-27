import { expect, test } from "@playwright/test";

// The 5th nav link (/contact) is built in Sprint 3 — see the fixme below.
const PAGES = [
  { path: "/", gradient: "digital bridges" },
  { path: "/services", gradient: "drive growth" },
  { path: "/products", gradient: "one vision" },
  { path: "/about", gradient: "people behind" },
];

test("nav pages resolve 200 and their h1 carries the gradient words", async ({ page }) => {
  for (const { path, gradient } of PAGES) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(gradient);
  }
});

// TODO(S3): unskip when the contact page exists.
test.fixme("the fifth nav link /contact resolves 200", async ({ page }) => {
  const response = await page.goto("/contact");
  expect(response?.status()).toBe(200);
});
