import { Resend } from "resend";
import { env } from "./env";
import type { ContactInput } from "./validation";

/**
 * Sends the contact notification. Falls back to a dev-side console log when
 * RESEND_API_KEY / CONTACT_TO_EMAIL are not configured (documented fallback —
 * local runs never send email).
 */
export async function sendContactEmail(input: ContactInput): Promise<void> {
  if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL) {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Digital Chautari <onboarding@resend.dev>",
      to: env.CONTACT_TO_EMAIL,
      subject: `[Website] ${input.subject}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Project types: ${input.projectTypes.join(", ")}`,
        "",
        input.message,
      ].join("\n"),
    });
    return;
  }
  console.log("[contact:dev]", input);
}
