# Digital Chautari

Marketing website for **Digital Chautari** — a Kathmandu-based creative technology company
blending digital marketing, content creation, and health-tech software (Physio@Home).

Five public pages (Home, Services, Products, About, Contact) plus FAQ, Blog, Privacy,
Terms — built to the approved design spec: Sora/Inter type ramp, teal/gold/leaf token
palette on paper, navy dark bands, GSAP scroll reveals with a full reduced-motion kill
switch, and a spam-hardened contact form (zod + rate limit + honeypot).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict + noUncheckedIndexedAccess) ·
Tailwind CSS 4 (CSS-first `@theme` tokens) · GSAP + @gsap/react · react-hook-form + zod ·
Resend (optional — see env vars) · Vitest + Testing Library · Playwright · axe-core · Lighthouse CI

## Commands

```bash
pnpm dev        # dev server on :3000 (styleguide at /dev, noindex)
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest (unit)
pnpm exec playwright test   # e2e — prefers the running :3000 server; reuseExistingServer is on
pnpm exec lhci autorun      # Lighthouse budgets (lighthouserc.json)
```

E2e quality bar: every route must answer 200 with **zero console errors**, reveals must
survive repeated navigation, and the axe scan must report **zero violations**.

## Environment variables

Copy `.env.example` to `.env` for local overrides. All are optional locally:

| Variable | Used for | Without it |
|---|---|---|
| `CONTACT_TO_EMAIL` | contact-form submissions recipient | mailer logs to console |
| `RESEND_API_KEY` | sending the contact email via Resend | mailer logs to console |
| `NEXT_PUBLIC_SITE_URL` | canonical URL for sitemap/robots/OG/JSON-LD | `http://localhost:3000` |

## Project layout

- `app/` — routes (all prerendered), `/api/og` ImageResponse, sitemap/robots
- `components/` — `ui/` primitives, `layout/`, `sections/` (presentation only)
- `lib/data/` — all page copy, verbatim from the approved content
- `lib/core/` — pure contact-form logic (validation, rate limit, mailer); no React
- `hooks/` — client orchestration (`useContactForm`)
- `app/globals.css` — the three-layer token system; hex literals live nowhere else

## Docs

- **Deploying:** see [docs/DEPLOY-RUNBOOK.md](docs/DEPLOY-RUNBOOK.md)
  — deployment is performed by the site owner, not by tooling.
- Copy marked ⟨TBC⟩ in `lib/data/` still needs real client input
  (all are data-file edits — no code changes required).
