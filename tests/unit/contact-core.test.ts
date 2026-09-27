import { describe, expect, it } from "vitest";
import { ContactSchema, PROJECT_TYPES } from "@/lib/core/validation";
import { rateLimit } from "@/lib/core/rate-limit";
import { submitContact } from "@/lib/core/submit";

const valid = {
  name: "Asha Karki",
  email: "asha@example.com",
  subject: "Website redesign",
  projectTypes: ["Digital Marketing" as const],
  message: "We would like to relaunch our site before Dashain.",
};

describe("ContactSchema", () => {
  it("accepts a valid payload", () => {
    expect(ContactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a bad email", () => {
    const result = ContactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.email).toBeTruthy();
  });

  it("rejects a short name", () => {
    const result = ContactSchema.safeParse({ ...valid, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.name).toBeTruthy();
  });

  it("rejects empty projectTypes", () => {
    const result = ContactSchema.safeParse({ ...valid, projectTypes: [] });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.projectTypes).toBeTruthy();
  });

  it("rejects an overly long message", () => {
    const result = ContactSchema.safeParse({ ...valid, message: "x".repeat(2001) });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.message).toBeTruthy();
  });

  it("exposes all six project types", () => {
    expect(PROJECT_TYPES).toHaveLength(6);
  });
});

function makeFormData(overrides: Record<string, string> = {}): FormData {
  const data = new FormData();
  data.set("name", valid.name);
  data.set("email", valid.email);
  data.set("subject", valid.subject);
  data.set("message", valid.message);
  data.append("projectTypes", "Digital Marketing");
  for (const [key, value] of Object.entries(overrides)) data.set(key, value);
  return data;
}

describe("submitContact", () => {
  it("returns ok for a valid submission (dev mailer logs)", async () => {
    await expect(submitContact(makeFormData(), "test-valid")).resolves.toEqual({ ok: true });
  });

  it("returns field errors for an invalid submission", async () => {
    const result = await submitContact(makeFormData({ email: "nope" }), "test-invalid");
    expect(result).toEqual({
      ok: false,
      errors: { email: ["Please enter a valid email address."] },
    });
  });

  it("silently accepts when the honeypot is filled", async () => {
    await expect(
      submitContact(makeFormData({ company: "spam-bot" }), "test-honeypot"),
    ).resolves.toEqual({
      ok: true,
    });
  });
});

describe("rateLimit", () => {
  it("blocks the 6th hit inside the window", () => {
    const key = "unit-rate-limit";
    expect(rateLimit(key, 5, 60_000)).toBe(true);
    expect(rateLimit(key, 5, 60_000)).toBe(true);
    expect(rateLimit(key, 5, 60_000)).toBe(true);
    expect(rateLimit(key, 5, 60_000)).toBe(true);
    expect(rateLimit(key, 5, 60_000)).toBe(true);
    expect(rateLimit(key, 5, 60_000)).toBe(false);
  });
});
