"use server";

import { submitContact } from "@/lib/core/submit";

export type ActionState = { ok: true } | { ok: false; errors: Record<string, string[]> };

export async function submitContactAction(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const ip = process.env.VERCEL_X_FORWARDED_FOR ?? "local";
  const headersList = await import("next/headers").then((m) => m.headers());
  const result = await submitContact(formData, headersList.get("x-forwarded-for") ?? ip);
  return result;
}
