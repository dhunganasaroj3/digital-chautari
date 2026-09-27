import { ContactSchema } from "./validation";
import type { ContactInput, ContactResult } from "./validation";
import { rateLimit } from "./rate-limit";
import { sendContactEmail } from "./mailer";

export async function submitContact(formData: FormData, ip: string): Promise<ContactResult> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { ok: true }; // silently drop bots
  }

  if (!rateLimit(ip)) {
    return {
      ok: false,
      errors: { _form: ["Too many messages — please try again in a minute."] },
    };
  }

  const parsed = ContactSchema.safeParse({
    ...Object.fromEntries(formData),
    projectTypes: formData.getAll("projectTypes"),
  });
  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    const errors: Record<string, string[]> = {};
    for (const [field, messages] of Object.entries(flattened)) {
      if (messages) errors[field] = messages;
    }
    return { ok: false, errors };
  }

  const input: ContactInput = parsed.data;
  await sendContactEmail(input);
  return { ok: true };
}
