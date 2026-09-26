# SPRINT 4 — Hardening · Full Spec Verification · Launch Prep

**Prereq:** SPRINT-3 complete. You do NOT deploy — the user does, via the runbook in S4.9. Your job: make everything green and prepare the handoff.

---

## S4.1 — Full specification verification (the R-checklist)
Walk `docs/execution/CHECKLIST-R.md` (create it now from the block below — one line per requirement, tick only what you visually confirmed in the browser at 375 AND 1024). Anything failing → fix immediately as `S4.1-fix-N` commits before continuing.

```markdown
# R-CHECKLIST (tick = visually verified)
## Tokens
- [ ] R-002 teal #0F9488 on buttons/links/active nav/icon accents
- [ ] R-003 #0B6F66 hovers + dark-section accent text
- [ ] R-004 gold #E0A930 headline highlights, Most Popular badge, dark eyebrows
- [ ] R-005 leaf #7FAE3A gradient end stop
- [ ] R-006 ink #101826 body/headings
- [ ] R-007 navy #0B1220 stats banners/footer/process/dark CTAs
- [ ] R-008 navy-card #101D2B cards on navy
- [ ] R-009 navy-border #223140 dark card borders
- [ ] R-010 paper #FBFBF9 page bg
- [ ] R-011 line #E7E5DF card/input borders
- [ ] R-012 muted #5B6472 body copy/captions
- [ ] R-013 H1 gradient 90deg teal→gold→leaf clipped to text (A-2 gold on light)
- [ ] R-014 chips rotate mint/teal/gold/lilac/pink — no other hues
## Type
- [ ] R-015 Sora 600/700/800 headings
- [ ] R-016 Inter 400/500/600 body
- [ ] R-017 base 16px ink lh-1.5
- [ ] R-018 H1 46/32px 800
- [ ] R-019 H2 28–30px 700
- [ ] R-020 H3 16–17px 600–700
- [ ] R-021 body/lede 15–17px 400
- [ ] R-022 small 12–13px 500
- [ ] R-023 button 14–15px 600
- [ ] R-024 eyebrow 11–13px 600 uppercase ls 0.02em
## Layout
- [ ] R-025 1120px container; 40/22px gutters; 760px switch
- [ ] R-026 64/48/84+48 section rhythm
- [ ] R-027 20px grid gaps, 2/3/4 col grids
- [ ] R-028 radii 10/12/16/8
- [ ] R-029 card rest 1px line border; hover -4px + shadow token
- [ ] R-030 primary btn solid action teal white 13/24 8px; ghost white 1px border
## Global components
- [ ] R-031 sticky white/blur header, DC gradient mark + wordmark + tagline
- [ ] R-032 center nav 5 items + right Contact Us
- [ ] R-033 hamburger <760
- [ ] R-034 hero pattern every page (mint→paper, glow TR, eyebrow pill, gradient H1, lede, ≤720px text)
- [ ] R-035 stat bar bordered card, equal segments, dividers, chip+number+label
- [ ] R-036 dark banners: navy, gold eyebrow, white H2
- [ ] R-037 cards: white 1px 12px 22px, chip TL, h3, muted body
- [ ] R-038 footer navy 4-col + divider + centered ©
## Motion
- [ ] R-039 page fade+slide 0.45s
- [ ] R-040 scroll reveals, 70ms stagger
- [ ] R-041 hover lift −4→−5px + shadow; chip 1.08×
- [ ] R-042 reduced-motion kills all of it, content visible
## Home
- [ ] R-043 eyebrow "🚀 Welcome to Digital Chautari"
- [ ] R-044 H1 w/ gradient "digital bridges" + lede + 2 buttons
- [ ] R-045 stat bar 3/7+/100%
- [ ] R-046 features 4 exact titles
- [ ] R-047 who-we-are H2 + 2 paras + 2×2 checklist + Meet the Team →
- [ ] R-048 right 2×2 teasers incl. Branding & Design
- [ ] R-049 dark stats 250+/40+/1M+/98%
- [ ] R-050 products teaser 3 cards icon+category+desc+Learn more
- [ ] R-051 sectors 6
- [ ] R-052 dark numbered 4-step process
- [ ] R-053 testimonials 3 × 5-star + name + title/company
- [ ] R-054 blog teaser 3 w/ colored block, tag, date/read-time, excerpt
- [ ] R-055 gradient CTA panel + both buttons
## Services
- [ ] R-056 hero "Services that drive growth" (gradient "drive growth")
- [ ] R-057 3 rows icon+title+desc | 2×2 subs
- [ ] R-058 DM subs exact four
- [ ] R-059 pricing 3 tiers, Professional dark + Most Popular, checklists + CTAs
- [ ] R-060 industries 6
- [ ] R-061 dark why-us 6 exact items
- [ ] R-062 dark CTA + "Book a Consultation →"
## Products
- [ ] R-063 hero "Three ventures, one vision" (gradient "one vision")
- [ ] R-064 pill tabs; panel category/title/desc/stats/CTA
- [ ] R-065 mock preview right
- [ ] R-066 spotlight "Physio@Home — healthcare reimagined"
## About
- [ ] R-067 hero (gradient "people behind")
- [ ] R-068 story H2 + narrative
- [ ] R-069 tiles 2025/3/Kathmandu/7+ alternating teal/navy/white/gold
- [ ] R-070 mission & vision side-by-side
- [ ] R-071 values 4 exact
- [ ] R-072 dark quality 4 exact
- [ ] R-073 team 7 exact roles
- [ ] R-074 roadmap: alternating, center line, green dots, gold year pills, 4 milestones
- [ ] R-075 dark CTA "Want to join our journey?" + "Get in Touch →"
## Contact
- [ ] R-076 hero (gradient "conversation")
- [ ] R-077 info cards Address/Email/Phone/Hours
- [ ] R-078 "Reach the right team" 4 depts w/ emails
- [ ] R-079 form fields + Project-Type pills + Send
- [ ] R-080 map placeholder card
- [ ] R-081 dark FAQ callout
- [ ] R-082 response times 24h / 2–3 days / same day
```
(R-001 brand identity and A-1/D-decisions are structural; they are covered by R-002–R-082 passing.)

## S4.2–S4.3 — Fix batches
Every unticked box becomes fix tasks in order found. After fixes, re-run the checklist section affected. Commit per fix: `fix(<area>): <what> (S4.2)`.

## S4.4 — E2E completion
`tests/e2e/all-routes.spec.ts`: for each of the 9 public routes: `expect(response.status()).toBe(200)` + no console errors (`page.on("console")` fail on `error`); navigate Home→Services→Products→About→Contact→Home **3× in a row** — assert no duplicate-reveal glitch (elements visible, `opacity` eventually 1) — this is the GSAP leak regression test. `tests/e2e/reduced-motion.spec.ts`: `page.emulateMedia({ reducedMotion: "reduce" })`, load Home, scroll to bottom, assert every `[data-reveal]` element has computed `opacity: 1`. `tests/e2e/breakpoints.spec.ts`: viewport 759 vs 760 — hamburger hidden/shown; container gutter 22 vs 40px (getComputedStyle).

## S4.5 — axe scan
`pnpm add -D @axe-core/playwright`. Script loops the 9 routes with `AxeBuilder({ page }).analyze()` and fails on any violation. Fix ALL findings (common ones: button name, heading order, contrast — contrast must be fixed via tokens, never by bypassing).

## S4.6 — Lighthouse budgets
`pnpm add -D @lhci/cli`. `lighthouserc.json`:
```json
{ "ci": { "collect": { "numberOfRuns": 3, "settings": { "preset": "desktop" } } },
  "assert": { "assertions": {
    "categories:performance": ["error", { "minScore": 0.95 }],
    "categories:accessibility": ["error", { "minScore": 0.95 }],
    "categories:best-practices": ["error", { "minScore": 0.95 }],
    "categories:seo": ["error", { "minScore": 1 }] } } }
```
Add CI job step: `- run: pnpm exec lhci autorun --collect.url=http://localhost:3000 --collect.startServerCommand="pnpm start"` (build first). If performance < 95: audit with bundle analyzer; usual suspects = whole-app client components (fix by pushing "use client" leaves down), oversized images (we have none by design), GSAP loaded on routes without reveals (lazy-import `lib/gsap/reveals` inside the island only).

## S4.7 — Final gates
`pnpm lint && pnpm typecheck && pnpm test && pnpm exec playwright test && pnpm build` all green. `grep -rnE '#[0-9A-Fa-f]{6}' app components | grep -v globals.css` empty. PROGRESS.md current. Tag: `git tag v1.0.0-rc1`.

## S4.8 — Launch preparation (everything EXCEPT deploying)
1. `.env.example` at repo root:
```
# Where contact-form submissions are sent (required in production)
CONTACT_TO_EMAIL=
# Resend API key (required in production; omit locally to log instead)
RESEND_API_KEY=
# Canonical site URL (used by sitemap/robots/OG/JSON-LD)
NEXT_PUBLIC_SITE_URL=
```
2. Security headers in `next.config.ts`:
```ts
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];
export default { async headers() { return [{ source: "/(.*)", headers: securityHeaders }]; } };
```
3. Replace the two `localhost:3000` fallbacks (`metadataBase`, SITE_JSONLD) so they read `process.env.NEXT_PUBLIC_SITE_URL` with localhost fallback (they already should — verify).
4. Placeholder sweep: `grep -rn "TBC" PROGRESS.md CONTENT-TODO.md lib` — ensure CONTENT-TODO is complete and accurate; every item listed there must exist in code as `⟨TBC⟩` or be removable.
5. Write `README.md`: what the project is, commands (`pnpm dev / build / start / test / lint / typecheck / e2e`), env vars table (copy of .env.example), link to docs/plans + docs/execution, deployment pointer to the runbook below.
6. Write `docs/execution/DEPLOY-RUNBOOK.md` — content:
```markdown
# Deploy runbook (for the site owner — the AI does NOT run these)
1. Push repo to GitHub; import in Vercel (Framework: Next.js, defaults are correct).
2. Set env vars in Vercel → Settings → Environment Variables (Production):
   NEXT_PUBLIC_SITE_URL=https://<your-domain>, CONTACT_TO_EMAIL=<real inbox>, RESEND_API_KEY=<from resend.com>
3. Deploy. Then verify: HTTPS + headers (securityheaders.com), submit the contact form
   and confirm the email arrives, OG preview (opengraph.xyz), sitemap.xml + robots.txt load.
4. Swap localhost fallbacks are automatic once NEXT_PUBLIC_SITE_URL is set — redeploy if added later.
5. Post-launch: replace ⟨TBC⟩ content items listed in CONTENT-TODO.md (all are data-file edits, no code).
```

## S4.9 — Handoff
`REVIEW-REQUEST-S4.md`: final screenshots (9 routes × 2 widths), gate results (paste command outputs), remaining `⟨TBC⟩` list, runbook link. PROGRESS.md: CURRENT SPRINT: DONE. Final commit `chore: v1.0.0-rc1 handoff (S4.9)`.
**Then STOP. Deployment is the user's manual step per the runbook. Do not attempt to deploy.**
