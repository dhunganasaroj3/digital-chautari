import { z } from "zod";

export const PROJECT_TYPES = [
  "Digital Marketing",
  "Content Creation",
  "Software Development",
  "Branding & Design",
  "Physio@Home Partnership",
  "Other",
] as const;

export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (2+ characters)."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject."),
  projectTypes: z.array(z.enum(PROJECT_TYPES)).min(1, "Pick at least one project type."),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters).").max(2000),
  company: z.string().max(0).optional().or(z.literal("")), // honeypot — must be empty
});

export type ContactInput = z.infer<typeof ContactSchema>;
export type ContactResult =
  { ok: true } | { ok: false; errors: Record<string, string[]> & { _form?: string[] } };
