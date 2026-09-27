import { expect, test, type Page } from "@playwright/test";

async function fillValidForm(page: Page) {
  await page.getByLabel("Name").fill("Asha Karki");
  await page.getByLabel("Email").fill("asha@example.com");
  await page.getByLabel("Subject").fill("Website redesign");
  await page.getByRole("button", { name: "Digital Marketing" }).click();
  await page.getByLabel("Message").fill("We would like to relaunch our site before Dashain.");
  await page.getByRole("button", { name: "Send", exact: true }).click();
}

test.describe("valid submission", () => {
  // Distinct IP per test so the 5/60s rate limiter never couples tests.
  test.use({ extraHTTPHeaders: { "x-forwarded-for": "e2e-contact-valid" } });

  test("shows the success message", async ({ page }) => {
    await page.goto("/contact");
    await expect(async () => {
      await fillValidForm(page);
      await expect(page.getByText("reply within 24 hours")).toBeVisible();
    }).toPass({ timeout: 20_000 });
  });
});

test.describe("empty submission", () => {
  test.use({ extraHTTPHeaders: { "x-forwarded-for": "e2e-contact-invalid" } });

  test("shows at least 4 field errors", async ({ page }) => {
    await page.goto("/contact");
    await expect(async () => {
      await page.getByRole("button", { name: "Send", exact: true }).click();
      await expect(page.getByRole("alert").first()).toBeVisible();
      expect(await page.getByRole("alert").count()).toBeGreaterThanOrEqual(4);
    }).toPass({ timeout: 20_000 });
  });
});

test.describe("honeypot", () => {
  test.use({ extraHTTPHeaders: { "x-forwarded-for": "e2e-contact-honeypot" } });

  test("silently accepts a filled honeypot (no email sent)", async ({ page }) => {
    await page.goto("/contact");
    // Bot simulation: fill the hidden field via JS (it is display:none for users).
    await page.locator('input[name="company"]').evaluate((el) => {
      (el as HTMLInputElement).value = "spam-bot";
    });
    // Honeypot short-circuits before validation, so the rest can stay empty.
    await expect(async () => {
      await page.getByRole("button", { name: "Send", exact: true }).click();
      await expect(page.getByText("reply within 24 hours")).toBeVisible();
    }).toPass({ timeout: 20_000 });
    // "No email log entry" is a server-side (dev console) assertion — verified
    // manually while developing; the UI cannot observe the mailer.
  });
});

test.describe("reduced motion", () => {
  test.use({ extraHTTPHeaders: { "x-forwarded-for": "e2e-contact-reduced" } });

  test("form is fully usable without motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");
    await expect(async () => {
      await fillValidForm(page);
      await expect(page.getByText("reply within 24 hours")).toBeVisible();
    }).toPass({ timeout: 20_000 });
  });
});
