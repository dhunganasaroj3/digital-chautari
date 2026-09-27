# REVIEW REQUEST — Sprint 3 (Contact Backend · Ancillary Routes · SEO)

**Status:** All S3.1–S3.13 tasks complete. All gates green: `pnpm lint` · `pnpm typecheck` · `pnpm test` (27/27) · `pnpm build` (17 routes, all static except `/api/og`) · Playwright 9/9 **against the production build** · hex audit clean (only sanctioned hexes inside `app/api/og/route.tsx`, see notes).

## How to look at it

```bash
cd ~/projects/digital-chautari
pnpm build && pnpm start   # http://localhost:3000
```

## Screenshots (saved in this folder)

| File | What it shows |
|---|---|
| `shot-s3-contact-1440.png` | Full contact page: hero, 4 info cards, direct lines, form + map/FAQ/response column |
| `shot-s3-contact-375.png` | Contact at 375px — 2-col cards, stacked form (overflow sweep clean) |
| `shot-s3-faq-1440.png` | FAQ page, first accordion open (chevron rotated) |
| `shot-s3-blog-1440.png` | Blog index with the 3 placeholder posts |
| `shot-s3-404-1440.png` | Branded 404 ("This chautari doesn't exist") |

## What to review

1. **Contact form (the core of this sprint)** — `/contact`: tab through the fields; submit empty → ≥4 inline errors (`role="alert"`); toggle Project Type pills (teal when active); submit valid → "✅ Thanks — we'll reply within 24 hours." and the form resets. Without `RESEND_API_KEY`+`CONTACT_TO_EMAIL` the "email" is a `[contact:dev]` server console log (documented fallback). Honeypot `company` field is invisible; filling it makes submit succeed silently without sending.
2. **Direct lines / info cards** — `mailto:` links; long emails wrap (`wrap-anywhere`) instead of causing horizontal scroll at any width.
3. **FAQ** — pure `<details>/<summary>` (works without JS); chevron rotates via `group-open:`.
4. **SEO** — every route emits the exact S3.8 title/description (verified in `.next/server/app/*.html`); per-page OG images via `/api/og?title=…` (navy card, DC mark, gold eyebrow — view `/api/og?title=Services` directly); Organization + WebSite JSON-LD in every page source; `/sitemap.xml` lists 9 routes; `/robots.txt` disallows `/dev` + `/api/`.
5. **Ancillary pages** — `/blog`, `/privacy`, `/terms` (prose-lite, effective 26 September 2026), branded 404, client error boundary with retry.
6. **Tests** — `tests/unit/contact-core.test.ts` (schema/honeypot/rate-limit), `tests/unit/links.test.ts` (no dead internal links vs sitemap), `tests/e2e/contact.spec.ts` (valid/invalid/honeypot/reduced-motion, each with a distinct spoofed IP so the rate limiter can't couple tests), `tests/e2e/nav.spec.ts` now asserts **all 5** nav links + ancillary routes + 404 (the S2 `test.fixme` is unskipped).

## Open ⟨TBC⟩ items (CONTENT-TODO.md)

- Contact details (emails, phone, business hours — brief placeholders)
- Map embed (CSS placeholder stands in)
- Product external URLs, team names, testimonials, blog posts (`#` links), header tagline, footer legal name (carried from S1/S2)
- Legal review of privacy/terms bodies
- Social profiles for JSON-LD `sameAs` (currently `[]`)

## Implementation notes for the reviewer

- **Resend keys are intentionally NOT configured** — the mailer logs to the server console in dev; the S4 runbook covers adding `RESEND_API_KEY`/`CONTACT_TO_EMAIL` as deployment secrets. Nothing secret is committed (`.env.example` pattern, `lib/core/env.ts` validates).
- Rate limiting is in-memory per instance (accepted serverless caveat, commented in `lib/core/rate-limit.ts`).
- OG route renders with satori's **default font**: `@fontsource-variable/sora` ships woff2 only, satori needs TTF/OTF — the brief explicitly allows this fallback. Hexes in `app/api/og/route.tsx` + `app/icon.svg` are per-brief (OG/icons render outside the CSS token system).
- **Ops lesson (S3.13):** the old `pnpm dev` survived a weak `kill` and kept port 3000 — `pnpm start` failed EADDRINUSE while e2e/screenshots unknowingly ran against dev (spotted via the dev-overlay badge in a screenshot). Fixed with explicit `kill -9` PIDs via `ss -tlnp`; e2e + screenshots were re-run against the true production build.
- `pnpm lint` reports exactly one warning: `react-hooks/incompatible-library` on react-hook-form (brief-mandated stack; harmless without the React Compiler).
