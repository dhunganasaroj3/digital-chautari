import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  RESEND_API_KEY: z.string().optional(),
});

export const env = Env.parse(process.env);
