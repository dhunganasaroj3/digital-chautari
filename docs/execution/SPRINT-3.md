# SPRINT 3 — Contact Backend · Ancillary Routes · SEO

**Prereq:** SPRINT-2 complete. Conventions (tokens-only, verbatim copy, `StaggerGroup`, ICONS map) still apply.

---

## S3.1 — Core logic layer (`lib/core/`, zero React imports)
Install: `pnpm add zod resend` (nodemailer ONLY if the user later requires SMTP — default is Resend).
`lib/core/env.ts`:
```ts
import { z } from "zod";
const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  RESEND_API_KEY: z.string().optional(),
});
export const env = Env.parse(process.env);
```
`lib/core/validation.ts`:
```ts
import { z } from "zod";
export const PROJECT_TYPES = ["Digital Marketing", "Content Creation", "Software Development", "Branding & Design", "Physio@Home Partnership", "Other"] as const;
export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (2+ characters)."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject."),
  projectTypes: z.array(z.enum(PROJECT_TYPES)).min(1, "Pick at least one project type."),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters).").max(2000),
  company: z.string().max(0).optional().or(z.literal("")),   // honeypot — must be empty
});
export type ContactInput = z.infer<typeof ContactSchema>;
export type ContactResult = { ok: true } | { ok: false; errors: Record<string, string[]> & { _form?: string[] } };
```
`lib/core/rate-limit.ts`: in-memory fixed window — `const hits = new Map<string, { count: number; reset: number }>();` `export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean` (true = allowed). Serverless caveat is accepted (per-instance); note in file comment.
`lib/core/mailer.ts`: `export async function sendContactEmail(input: ContactInput): Promise<void>` — if `env.RESEND_API_KEY && env.CONTACT_TO_EMAIL`: new `Resend(key).emails.send({ from: "Digital Chautari <onboarding@resend.dev>", to: env.CONTACT_TO_EMAIL, subject: \`[Website] \${input.subject}\`, text: …all fields… })`; else `console.log("[contact:dev]", input)` and return (documented fallback).
`lib/core/submit.ts`: `export async function submitContact(formData: FormData, ip: string): Promise<ContactResult>` — parse `Object.fromEntries` with `projectTypes` as `formData.getAll("projectTypes")`; honeypot filled → return `{ ok: true }` silently (spam); `!rateLimit(ip)` → `{ ok: false, errors: { _form: ["Too many messages — please try again in a minute."] } }`; `safeParse` fail → zod flattened errors; success → `sendContactEmail` → `{ ok: true }`.
`tests/unit/contact-core.test.ts`: schema accepts valid, rejects bad email / short name / empty projectTypes / long message; honeypot trip returns ok; rate limiter blocks 6th hit in window.
DONE WHEN: `pnpm test` green; no React import in `lib/core/**` (`grep -r "react" lib/core` empty).

## S3.2 — Server action (`app/actions/contact.ts`)
```ts
"use server";
import { submitContact } from "@/lib/core/submit";
export type ActionState = { ok: true } | { ok: false; errors: Record<string, string[]> };
export async function submitContactAction(_prev: ActionState | null, formData: FormData): Promise<ActionState> {
  const ip = process.env.VERCEL_X_FORWARDED_FOR ?? "local";
  const headersList = await import("next/headers").then((m) => m.headers());
  const result = await submitContact(formData, headersList.get("x-forwarded-for") ?? ip);
  return result;
}
```
(Keep it this thin. If the x-forwarded-for read causes type friction, fall back to constant `"local"` and note it.)

## S3.3 — Contact form UI + hook
`hooks/useContactForm.ts` ("use client"): react-hook-form + `zodResolver(ContactSchema)` for live validation; submission via `useActionState(submitContactAction, null)`; expose `register`, `errors` (merge RHF + server), `isSubmitting`, `result`, `toggleProjectType`.
Install: `pnpm add react-hook-form @hookform/resolvers`.
`components/sections/ContactForm.tsx`:
- Fields: Name (`input`), Email (`input type="email"`), Subject (`input`), Project Type (`role="group" aria-label="Project type"` of `PillTag`-style buttons `type="button" aria-pressed`, name `projectTypes` via hidden inputs or `formData.getAll` — render one `<input type="hidden" name="projectTypes" value={t}>` per selected), Message (`textarea rows={5}`).
- Inputs: `w-full rounded-card border border-border-default bg-surface-card px-4 py-3 text-lede` + visible `<label htmlFor>` above each; error `<p id={`${field}-error`} role="alert" className="text-small text-red-600">` linked via `aria-describedby`.
- Honeypot: `<input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true">`.
- Submit: primary-styled `<button type="submit" disabled={isSubmitting}>` label `Send` (add lucide `Send` icon); pending label "Sending…".
- Status `<div aria-live="polite">`: success → `✅ Thanks — we'll reply within 24 hours.` + form reset; `_form` error → shown there.
DONE WHEN: tab order sane; errors announce; Enter submits; server rejection path renders `_form` error; honeypot invisible to users.

## S3.4 — Contact page (`app/contact/page.tsx`)
Data `lib/data/contact.ts`:
```ts
export const CONTACT_HERO = { eyebrow: "Contact", title: "Let's start a conversation", gradient: "conversation",
  lede: "Tell us where you're headed — we'll help you build the bridge." } as const;
export const INFO_CARDS = [
  { icon: "MapPin", title: "Address", body: "Kathmandu, Nepal" },
  { icon: "Mail", title: "Email", body: "hello@digitalchautari.com.np" },
  { icon: "Phone", title: "Phone", body: "+977 01-1234567" },
  { icon: "Clock", title: "Business Hours", body: "Sun–Fri, 10:00–18:00 NPT" },
] as const;
export const DIRECT_LINES = {
  eyebrow: "Direct lines", title: "Reach the right team",
  items: [
    { icon: "Megaphone", title: "Marketing", email: "marketing@digitalchautari.com.np" },
    { icon: "Video", title: "Content Studio", email: "studio@digitalchautari.com.np" },
    { icon: "Code2", title: "Software Dev", email: "dev@digitalchautari.com.np" },
    { icon: "Briefcase", title: "Business Dev", email: "business@digitalchautari.com.np" },
  ],
} as const;
export const RESPONSE_TIMES = { title: "Response times", items: [
  { icon: "Mail", label: "Email", value: "Within 24 hours" },
  { icon: "FileText", label: "Proposals", value: "2–3 days" },
  { icon: "Zap", label: "Urgent requests", value: "Same day" },
] } as const;
```
(emails/phone/hours → CONTENT-TODO as ⟨TBC⟩.) Layout: Hero → 4 info Cards (`grid-cols-2 lg:grid-cols-4`) → DIRECT_LINES 4 Cards (`grid-cols-2 lg:grid-cols-4`, `mailto:` links) → two-column `grid grid-cols-1 nav:grid-cols-2 gap-8 items-start`: LEFT = ContactForm inside a Card; RIGHT = `MapPlaceholder` (Card: `ratio-blog` block with CSS-stylized abstract streets: 3 crossing `h-1 rounded bg-border-default` lines + `MapPin` icon center + caption "Kathmandu, Nepal — map coming soon", all `aria-hidden` except caption) + dark callout Card (`data-scheme="dark"`: "Need quick answers?" + link `Visit FAQ page →` → `/faq`) + RESPONSE_TIMES Card (3 rows icon + label + value).

## S3.5 — Form e2e (`tests/e2e/contact.spec.ts`)
Happy path: fill valid, click Send → expect success text (mailer logs in dev). Invalid: submit empty → expect ≥4 field errors. Honeypot: set hidden input value via JS → submit → expect success (silently dropped) AND no email log entry. Use `page.emulateMedia({ reducedMotion: "reduce" })` in one test to assert form fully usable without motion.

## S3.6 — FAQ page (`app/faq/page.tsx` + `lib/data/faq.ts`)
Native `<details>/<summary>` accordions (no JS needed): summary styled as Card header with `ChevronDown` rotate on `[open]`; `<summary>` focusable by default. Six entries:
1. **What services does Digital Chautari offer?** — "Three practices — digital marketing, content creation, and software development — delivered by one integrated team. See Services for the full breakdown."
2. **How does pricing work?** — "Plans start at Rs 15,000/mo for Starter and Rs 45,000/mo for Professional; Enterprise is scoped per project. Every engagement is quoted upfront — no surprise invoices."
3. **How quickly will I hear back?** — "Emails within 24 hours, full proposals in 2–3 days, and urgent requests the same day."
4. **Do you work with clients outside Kathmandu?** — "Yes — we're remote-first with a pan-Nepal network and clients across time zones."
5. **What is Physio@Home?** — "Our health-tech venture: certified physiotherapists booked for at-home sessions, with scheduling and progress tracking in one app."
6. **Can I join the team?** — "We're growing. Reach out via the contact form with 'Other' as the project type and 'Careers' in the subject."
Page: Hero-lite (eyebrow "FAQ", H2 "Frequently asked questions" — no gradient word needed here), metadata per S3.8.

## S3.7 — Blog index + legal stubs
`app/blog/page.tsx`: reuse POSTS; heading (eyebrow "Blog", H2 "Latest from our blog"); 3 Cards identical to Home BlogTeaser but `Read more →` links to `#` (posts are placeholders — CONTENT-TODO). Add `Link` disabled-look note? No — keep `#` and log.
`app/privacy/page.tsx` and `app/terms/page.tsx`: Prose-lite layout (`Section standard`, H1, effective date "26 September 2026", 4–6 short paragraphs each: who we are / what we collect (contact form only) / how it's used / contact; terms: services provided as-is / IP / liability / governing law Nepal). Mark both pages' bodies `⟨TBC legal review⟩` in CONTENT-TODO.

## S3.8 — Per-page metadata
In `app/layout.tsx`: `metadata` object — `metadataBase: new URL("http://localhost:3000")` (S4 runbook swaps domain), `title: { default: "Digital Chautari — Creative Technology Company in Kathmandu", template: "%s · Digital Chautari" }`, description default, `openGraph: { type: "website", siteName: "Digital Chautari" }`.
Per page (`export const metadata`), titles + descriptions EXACTLY:
- Home (default above). Description: "Digital Chautari is a Kathmandu-based creative technology company blending digital marketing, content creation, and health-tech software."
- Services — title "Services", desc "Digital marketing, content creation, and software development — transparent pricing and agile delivery from Kathmandu."
- Products — title "Products", desc "Three ventures, one vision: Eco Creative Marketing Agency, One Content Creation Studio, and Physio@Home."
- About — title "About", desc "The people behind Digital Chautari — our story, values, team, and roadmap from a chautari to a digital powerhouse."
- Contact — title "Contact", desc "Start a conversation with Digital Chautari — we reply to email within 24 hours."
- Blog — title "Blog", desc "Notes on marketing, content, and engineering from the Digital Chautari team."
- FAQ — title "FAQ", desc "Answers on services, pricing, response times, and Physio@Home."
- Privacy — title "Privacy Policy"; Terms — title "Terms of Service".

## S3.9 — OG images + icons
`app/api/og/route.tsx` (ImageResponse): 1200×630; navy background `#0B1220` + DC mark (rounded square `#0F9488`→`#0B6F66` gradient with "DC") + gold eyebrow "Digital Chautari" + `{title}` param in Sora **using a bundled font buffer** (`fs.readFile` from `node_modules/@fontsource-variable/sora/files/…woff2`? — ImageResponse needs TTF: `pnpm add -D @fontsource-variable/sora` and read its `.ttf` if present, else default font is ACCEPTABLE fallback; note choice in Decisions). `export const runtime = "nodejs"`.
Per-page OG: each page adds `openGraph: { images: ["/api/og?title=…"] }`.
`app/icon.svg`: rounded square, gradient `#0F9488`→`#0B6F66`, white bold "DC" (text element, font-family system sans). `app/apple-icon.png` — generate 180×180 from the same design via any available tool; if impossible, delete the requirement and note it (icon.svg suffices in modern browsers).

## S3.10 — JSON-LD
`app/layout.tsx` renders `<script type="application/ld+json" dangerouslySetInnerHTML>` with `@/lib/data/seo.ts`:
```ts
export const ORG_JSONLD = {
  "@context": "https://schema.org", "@type": "Organization",
  name: "Digital Chautari",
  description: "Creative technology company in Kathmandu, Nepal — digital marketing, content creation, and health-tech software.",
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  foundingDate: "2025",
  email: "hello@digitalchautari.com.np",
  sameAs: [] as string[],   // ⟨TBC⟩ social profiles
};
export const SITE_JSONLD = { "@context": "https://schema.org", "@type": "WebSite", name: "Digital Chautari", url: "http://localhost:3000" };
```
(URL swapped in S4 runbook.) Validate with https://validator.schema.org mentally — fields must serialize (no undefined).

## S3.11 — Link audit + sitemap + robots
`app/sitemap.ts`: export default `() => [ "", "/services", "/products", "/about", "/contact", "/blog", "/faq", "/privacy", "/terms" ].map((p) => ({ url: BASE + p, lastModified: new Date() }))` — BASE from `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"` (add to env schema as optional). `app/robots.ts`: allow all, `disallow: ["/_dev", "/api/"]`.
Test `tests/unit/links.test.ts`: import all data modules, collect every internal `href` starting with `/`, assert each is in the sitemap list (or is an anchor variant of one).
DONE WHEN: test green → no dead internal links.

## S3.12 — Error pages
`app/not-found.tsx`: hero-lite on paper bg, `text-h1` "404", H2 "This chautari doesn't exist", body "The page you're looking for has wandered off the trail.", buttons Home (primary) + Contact (ghost). `app/error.tsx` ("use client"): message "Something went wrong." + retry `<button onClick={() => reset()}>`.

## S3.13 — SEO verification + close
`pnpm build` → check every route emits `<title>`/meta description (inspect `.next/server/app/**.html` or run dev + view-source). Then REVIEW-REQUEST-S3.md (incl. `⟨TBC⟩` list — by now it should include: contact details, product external URLs, blog post links, legal review, social profiles). PROGRESS → CURRENT SPRINT: 4. Commit per task as you go.
