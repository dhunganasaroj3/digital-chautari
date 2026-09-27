# REVIEW REQUEST — Sprint 4: Hardening · Full Spec Verification · Launch Prep

**Date:** 2026-09-28 · **Tag:** `v1.0.0-rc1` · **Status:** all Sprint 4 tasks complete,
all gates green, handoff ready. **Deployment is yours** — see
[DEPLOY-RUNBOOK.md](DEPLOY-RUNBOOK.md). Nothing has been deployed by the AI.

---

## 1. R-checklist — 82/82 verified

[CHECKLIST-R.md](CHECKLIST-R.md) was walked against the production build (`pnpm build` +
`pnpm start`, port ownership confirmed via `ss -tlnp`) at **375 and 1024 px**. Method:
Playwright probe over the live DOM (computed styles for every token/type/layout item,
text assertions for route copy, console-error capture) plus the full-page screenshots
below, reviewed visually. Screenshots: `docs/execution/shots-s4/` — 9 routes × 2 widths,
captured against the final build (after the fixes in §3):

`home-1024/375 · services-1024/375 · products-1024/375 · about-1024/375 · contact-1024/375 ·
blog-1024/375 · faq-1024/375 · privacy-1024/375 · terms-1024/375` (all `.png`)

## 2. Final gate results

| Gate | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | `0 errors` (1 accepted warning: `react-hooks/incompatible-library` on react-hook-form, brief-mandated stack) |
| Types | `pnpm typecheck` | exit 0 |
| Unit | `pnpm test` | `7 files, 27/27 passed` |
| E2E | `pnpm exec playwright test` | `31/31 passed` against the **production** build on :3000 |
| — of which axe | `tests/e2e/axe.spec.ts` | `9/9 routes — zero violations` |
| Build | `pnpm build` | 16 routes: all pages static; only `/api/og` dynamic (ImageResponse) |
| Hex audit | `grep -rnE '#[0-9A-Fa-f]{6}' app components \| grep -v globals.css …` | clean; only sanctioned literals are `app/api/og/route.tsx` + `app/icon.svg` (render outside the CSS cascade; hexes per brief) |
| Lighthouse | `pnpm exec lhci autorun` (desktop, 3 runs) | **performance 100 · accessibility 100 · best-practices 100 · SEO 100** (budgets: ≥95/≥95/≥95/100) |
| Reduced motion | e2e + probe | all `[data-reveal]` visible with `reducedMotion: "reduce"`; page-enter duration 1e-05s |
| Security headers | `curl -I` | all 5 present on every route (X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, HSTS preload) |
| Canonical URL | build with `NEXT_PUBLIC_SITE_URL` set | JSON-LD `url`, sitemap.xml, robots.txt sitemap, absolute og:image all swap to the env domain; localhost fallback intact |

## 3. Defects found & fixed this sprint

- **S4.1-fix-1 — React #418 hydration errors on `/` and `/blog`:** BlogPostCard rendered
  "Read more →" as a `<Link>` inside the whole-card `<Link>` (`<a>` in `<a>`). React
  recovered silently; caught by the new console-error e2e. Fix: styled `<span>`.
- **S4.1-fix-2 — dark-section eyebrows were muted, spec R-004/R-036 wants gold:** `Eyebrow dark`
  now renders the gold treatment (banners, process, why-us, quality, CTA, spotlight).
- **S4.1-fix-3 — card hover lift was dead on revealed cards:** GSAP left inline
  `transform/translate` that overrode the CSS hover; `clearProps: "transform"` on reveal
  completion restores it (hover now computes `translate: 0px -4px` + shadow token).
- **S4.1-fix-4 — small text weight:** 12–13px copy now carries 500 (R-022) via text tokens.
- **S4.5 — axe violations:** AA teal info tile (`bg-action`) + full-opacity label; team
  initials to `action-hover` teal (≈5.4:1 on pastels); `h1` on blog/faq; contact info-card
  titles `h3→h2`; blog card titles `h2` on the index (`titleAs` prop); sr-only
  `<h2>Footer</h2>` so footer column h3s never skip a level.
- **S4.8 — canonical URL wiring:** `metadataBase` + `SITE_JSONLD.url` now read
  `NEXT_PUBLIC_SITE_URL` (they still hardcoded localhost); home page gained its missing
  `og:image`; security headers added to `next.config.ts`.
- **Process lesson:** `next dev` and `next build` sharing `.next` corrupts the Turbopack
  font module ("queries have exactly one entry") — always build with dev servers stopped.

## 4. Remaining ⟨TBC⟩ content (all data-file edits, tracked in [CONTENT-TODO.md](../../CONTENT-TODO.md))

1. Header tagline; footer legal name
2. Testimonial people/quotes (placeholders)
3. Blog posts (dates/titles draft; "Read more" links are `#` until posts exist)
4. External product URLs (all three venture CTAs are `#`)
5. Team member names (initials per brief)
6. Contact details (emails/phone/hours are brief placeholders)
7. Social profiles (`ORG_JSONLD.sameAs` — empty array)
8. Legal review of privacy + terms stub prose
9. Real map embed (CSS placeholder in place)

## 5. Launch

[DEPLOY-RUNBOOK.md](DEPLOY-RUNBOOK.md) — push to GitHub, import in Vercel, set the three
env vars from `.env.example`, deploy, then verify HTTPS/headers, contact email delivery,
OG preview, sitemap/robots. Post-launch, work through CONTENT-TODO.
