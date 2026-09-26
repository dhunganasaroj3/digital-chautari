# Digital Chautari — Sprint Plan (Implementation)

**Parent document:** [2026-09-26-digital-chautari-website-plan.md](./2026-09-26-digital-chautari-website-plan.md) (the "Design Plan" — §refs below point into it)
**Plan date:** 2026-09-26 · **Duration:** 4 sprints × 1 week · **Launch:** Fri 2026-10-23 (+ reserved buffer Oct 26–27)
**⚠ Executor note:** This file is the human-facing plan. The machine-facing, fully self-contained briefs live in [`docs/execution/`](../execution/EXECUTION.md) (EXECUTION.md protocol + SPRINT-1…4). Confirmed execution decisions: per-sprint playbook files · exact snippets for critical parts · deployment via runbook split (AI prepares, human deploys) · contrast adjustments A-1/A-2 ON.

---

## 1. Delivery Assumptions & Capacity Model

| Parameter | Value | Notes |
|---|---|---|
| Team | 1 full-stack dev (you) + stakeholder (async reviews) + optional designer consult | RACI in §9 |
| Focus capacity | **6 focused hours/day**, 5 days/week → **30 h/sprint** | Meetings/context-switch excluded |
| Total core estimate | **~92 h** across 60 task rows | Fits 4 sprints (120 h) with ~28 h slack (~23%) |
| Slack / buffer | ~6 h/sprint built into each sprint (≈20%) + 2 reserved buffer days (Oct 26–27) | Consumed only by risk triggers (§11) |
| Cadence | Mon–Fri; daily async update; end-of-sprint demo (recorded or screenshots) | §8 ceremonies |
| Sprint length | 1 week — short on purpose: visual spec work needs fast feedback loops | |
| Scheduling rule | If a task exceeds estimate by >50%, stop, timebox a simplification, log to risk register | Never silently absorb overrun |

**Sprint → Design-plan phase mapping (full coverage, nothing dropped):**

| Sprint | Dates | Goal (user value) | Phases | Core h |
|---|---|---|---|---|
| **S1 Foundation & Home** | Sep 28 – Oct 2 | "The brand system is real and the homepage is pixel-faithful" | 0, 1, 2, 3 | 28 |
| **S2 Inner Pages** | Oct 5 – 9 | "Every content page exists and works with keyboard + reduced motion" | 4, 5, 6 | 22.5 |
| **S3 Contact, Backend & SEO** | Oct 12 – 16 | "Anyone can send a working enquiry; the site is findable and shareable" | 7, 8, 9 | 21 |
| **S4 Hardening & Launch** | Oct 19 – 23 | "Every quality gate is green and the site is live" | 10, 11 | 20.5 |

---

## 2. Working Agreements (engineering best practices, binding for all sprints)

### 2.1 Git workflow
- **Trunk-based with short-lived branches:** `main` is always deployable; one branch per task or tight task group: `feat/s1-tokens`, `feat/s2-products-tabs`, `fix/s4-contrast`…
- **Branch lifetime ≤ 1 day** — merge (or rebase) daily so integration risk never accumulates.
- **Conventional Commits:** `feat(hero): add gradient word to services h1` / `fix(nav): trap focus in mobile menu` / `chore(ci): add lighthouse budgets` / `test(form): honeypot e2e`.
- **PR template (even solo — self-review is the point):**
  - [ ] AC of the task verified locally
  - [ ] `pnpm lint && pnpm typecheck && pnpm test` green
  - [ ] Styling uses semantic tokens only — no hex/arbitrary values outside `globals.css`
  - [ ] Component contains no business logic / no hard-coded copy
  - [ ] Motion: reduced-motion path verified (if motion touched)
  - [ ] R-IDs affected listed in PR description
- **Vercel preview deploys on every PR** — visual review happens on the preview URL, not localhost guesses.

### 2.2 Code quality rules (enforced by tooling, set up Day 1)
- TypeScript `strict` + `noUncheckedIndexedAccess`; ESLint 9 flat config (`typescript-eslint`, `eslint-config-next`, a11y rules); Prettier + `prettier-plugin-tailwindcss`.
- `simple-git-hooks` + `lint-staged`: staged files lint+format on commit (fast, <3 s).
- **WIP limit = 1.** Finish, verify, merge — then next task.
- Separation-of-concerns lint rule of thumb: if a `components/**` file imports from `lib/core/**` for anything other than types, it's wrong (design plan §7.1).

### 2.3 Definition of Ready (per task)
Has: concrete AC checkboxes, file targets from design plan §7.2, affected R-IDs, estimate ≤ 3 h (split otherwise).

### 2.4 Definition of Done (per task)
1. AC checkboxes all ticked (self-verified on preview deploy)
2. Unit/component tests written **in the same task** as the code (shift-left; no "test later")
3. `lint + typecheck + test + build` green in CI
4. A11y spot-check: keyboard operable, labels/r names present, contrast untouched
5. Motion tasks (any): `prefers-reduced-motion` verified via devtools emulation
6. No new `⟨TBC⟩` placeholder introduced without listing it in the content-request log (§12)

### 2.5 Sprint-level exit gates
Every sprint ends with: all its tasks Done, Lighthouse mobile quick-check (S1/S2) or budgeted run (S3/S4), axe clean on new routes, demo artifact recorded, risk register updated.

---

## 3. SPRINT 1 — Foundation & Home (Mon Sep 28 – Fri Oct 2)

**Goal:** The design system is real and the Home page is pixel-faithful to the PDF.
**R-IDs in scope:** R-002–R-042 (tokens, typography, layout, global components, motion) + R-043–R-055 (Home).
**Exit criteria:** Home renders fully at 375/760/1024/1440 with staggered reveals; header/footer/hero pattern implemented; Lighthouse mobile ≥ 90 perf / ≥ 95 a11y on `/`; **Gate G1** screenshots sent for async sign-off.

### Day 1 (Mon) — Environment & scaffold · Phase 0
| ID | Task | Deliverable / files | Est | Deps | Acceptance criteria | R-IDs |
|---|---|---|---|---|---|---|
| S1.1 | Install Node 22 LTS + pnpm | system + `.nvmrc` | 1h | — | `node -v` ≥ 22.x; `pnpm -v` works; npm restored | — |
| S1.2 | Scaffold Next.js 16 app | repo root via `create-next-app` (TS, App Router, Tailwind v4, Turbopack, src-less per design §7.2) | 1h | S1.1 | `pnpm dev` on :3000; `pnpm build` green; git repo initialized + initial commit | — |
| S1.3 | Tooling hardening | `prettier` + tailwind plugin, `simple-git-hooks` + `lint-staged`, strict tsconfig flags, `.editorconfig`, `package.json#engines` | 1.5h | S1.2 | commit triggers hook; `pnpm lint`/`typecheck` scripts exist and pass on scaffold | — |
| S1.4 | CI pipeline | `.github/workflows/ci.yml` | 1h | S1.2 | PR + push → install→lint→typecheck→build, green on scaffold | — |

### Day 2 (Tue) — Design system I (tokens & type) · Phase 1
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S1.5 | Three-layer token system | `app/globals.css` `@theme` (primitive→semantic→component, `data-scheme="dark"` remaps) + base body styles | 2h | S1.2 | All 16 spec hexes + 2 a11y-adjusted shades present **exactly once**; utilities `bg-surface/text-muted/border-card/rounded-card` generated; `grep -r '#[0-9A-Fa-f]\{6\}' components/` returns nothing | R-002–R-014, R-017, R-025–R-030 |
| S1.6 | Fonts & type scale | `app/layout.tsx` next/font (Sora 600/700/800, Inter 400/500/600, swap, `--font-*` vars) + `--text-h1…eyebrow` tokens incl. 46→32px responsive H1, 0.02em eyebrow tracking | 1.5h | S1.5 | Font subsets loaded; scale matches PDF table row-for-row; no FOUT layout shift (CLS < 0.02 on /) | R-015–R-024 |
| S1.7 | Core primitives | `components/ui/`: Button (primary/ghost/pill, 13/24 padding, 8px radius, focus-visible ring), Container (1120/40/22), Section (64/48/84-48), Eyebrow, GradientText, IconChip (pastel rotation via `chipTone`), Badge, PillTag | 2h | S1.5 | Each rendered on styleguide page; touch targets ≥44px; chips rotate mint→teal→gold→lilac→pink | R-025, R-028, R-030 |

### Day 3 (Wed) — Cards, motion + styleguide · Phase 1
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S1.8 | Card + StatBar | `Card` (light/dark variants, 1px border, 12px radius, 22px padding, hover −4px + spec shadow, chip 1.08× group-hover) · `StatBar` (equal segments, vertical dividers, chip+number+label, mobile stack) | 1.5h | S1.7 | Hover states match §5.4 exactly; dark variant uses `navy-card`/`navy-border` tokens | R-035, R-037, R-041 |
| S1.9 | GSAP foundation | `lib/gsap/setup.ts` (register ScrollTrigger + useGSAP), `lib/gsap/reveals.ts` (shared fadeUp tween 0.45s/power2.out, `ScrollTrigger.batch`, **`gsap.matchMedia()` reduced-motion gate**), `components/motion/Reveal` + `StaggerGroup` (70ms stagger) | 2h | S1.2 | Demo grid staggers at ~70ms; with reduced-motion emulation content is fully visible, zero transforms; navigating away leaves no orphaned tweens (React strict double-mount safe via `useGSAP`) | R-039, R-040, R-042 |
| S1.10 | Styleguide page | `app/_dev/page.tsx` (noindex): every token swatch, type scale, primitives, sample stagger grid, spec-value checklist | 1.5h | S1.5–S1.9 | Side-by-side checklist vs PDF values; used as G1 review artifact | all S1 tokens |
| S1.11 | Unit tests batch 1 | `tests/unit/`: `chipTone` rotation, Button variant render, StatBar segments, reveals config (durations/stagger constants) | 1h | S1.7–S1.9 | `pnpm test` green; constants asserted so spec drift breaks tests | — |
| — | **Gate G1 — async stakeholder sign-off on styleguide + Home-in-progress screenshots (24h SLA; proceed unless objections)** | | | | | |

### Day 4 (Thu) — Site chrome + hero · Phase 2
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S1.12 | SiteHeader | `components/layout/SiteHeader.tsx` | 1.5h | S1.7 | Sticky + white/blur; DC teal-gradient logo square + wordmark + tagline; centered 5-link nav w/ teal active state + `aria-current="page"`; right teal Contact Us button | R-031, R-032 |
| S1.13 | MobileNav | `components/layout/MobileNav.tsx` + `hooks/useMobileNav` | 1h | S1.12 | Appears <760px; hamburger with `aria-expanded`; focus trapped while open; Esc closes; body scroll locked | R-033 |
| S1.14 | SiteFooter | `components/layout/SiteFooter.tsx` + `lib/data/site.ts` | 1h | S1.7 | Navy bg; 4 columns (brand blurb / Company / Services / Legal) from data; divider; centered dynamic © 2025–2026 | R-038 |
| S1.15 | Hero section | `components/sections/Hero.tsx` (+ decorative `HeroBackdrop`) | 1.5h | S1.6 | Mint→paper full-bleed gradient + top-right radial teal/gold glow (aria-hidden); eyebrow pill; GradientText H1; lede; max-w 660–720px; hero section padding 84/48 | R-034 |
| S1.16 | Page transition + a11y shell | `app/template.tsx` (fade+slide 0.45s, reduced-motion off), skip-link, `layout.tsx` base metadata + `lang` | 1h | S1.9 | Route change animates once; skip link first focusable | R-039 |

### Day 5 (Fri) — Home page · Phase 3
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S1.17 | Home data modules | `lib/data/`: site, services-teaser, products, sectors, process, testimonials, posts | 1.5h | S1.14 | Typed exports; all Home copy lives here; placeholders marked `⟨TBC⟩` | R-043–R-055 (content) |
| S1.18 | Home sections 1–5 | `HomeHero` (🚀 eyebrow, gradient "digital bridges", 2 buttons, 3-segment StatBar) · `FeatureStrip` ×4 · `WhoWeAre` (2 paras + 2×2 checklist + Meet-the-Team→ + right 2×2 teasers) · `DarkStatsBanner` (250+/40+/1M+/98%) · `ProductsTeaser` ×3 | 2h | S1.15, S1.17 | Verbatim strings from spec; every grid wrapped in `StaggerGroup`; links resolve | R-043–R-050 |
| S1.19 | Home sections 6–10 | `SectorsGrid` ×6 · `ProcessSteps` (dark, numbered) · `Testimonials` ×3 (5-star, name, title) · `BlogTeaser` ×3 (colored placeholder block, tag, date/read-time, excerpt) · `ClosingCta variant="gradient"` | 1.5h | S1.18 | Dark banner uses gold eyebrow + white H2; gradient CTA panel teal→blue | R-051–R-055 |
| S1.20 | Sprint 1 verification | Lighthouse quick + axe on `/`; screenshot pack 375/760/1024/1440; send G1 pack | 1h | S1.19 | Perf ≥90, a11y ≥95, axe 0 violations | — |

**S1 capacity:** Day 1 = 4.5 h · Day 2 = 5.5 h · Day 3 = 6 h · Day 4 = 6 h · Day 5 = 6 h → **28 h core + 2 h slack** (daily loads respect the 6 h focus cap).

---

## 4. SPRINT 2 — Inner Pages (Mon Oct 5 – Fri Oct 9)

**Goal:** Services, Products, About exist to spec and survive keyboard-only + reduced-motion walkthroughs.
**R-IDs in scope:** R-056–R-075 (+ D-2/D-7/D-8/D-9 resolutions).
**Exit criteria:** 4 content routes complete; axe clean; tab switcher keyboard + deep-link verified; timeline semantics correct; **Gate G2** screenshots approved.

### Day 6 (Mon) — Services I
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S2.1 | Services data | `lib/data/services.ts` (3 categories + sub-services — DM's four verbatim; others marked *proposed* — pricing ×3 with features, industries ×6, why-us ×6) | 1h | S1.17 | Verbatim lists intact: SEO & SEM / Social Media Marketing / Paid Advertising / Analytics & Reporting; 6 why-us items exact | R-058–R-061 |
| S2.2 | Category rows ×3 | `ServiceCategoryRow` + page hero ("drive growth" gradient) | 2h | S2.1 | Left icon+title+description, right 2×2 sub-service grid; 20px gaps; alternating layout direction optional | R-056, R-057 |
| S2.3 | Pricing | `PricingTable` | 1.5h | S2.1 | Starter Rs 15,000/mo · Professional Rs 45,000/mo dark card + gold "Most Popular" badge · Enterprise Custom; feature checklists + CTAs → /contact | R-059 |

### Day 7 (Tue) — Services II + Products I
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S2.4 | Services tail | `IndustriesGrid` ×6 ("Who we work with") · dark `WhyWorkWithUs` checklist · `ClosingCta variant="dark"` ("Book a Consultation →") | 1.5h | S2.2 | 6 icon+label cards; dark banner pattern per R-036 | R-060–R-062 |
| S2.5 | Products data | `lib/data/products.ts` (3 ventures, category labels, descriptions, stats-or-tags, CTAs) | 0.5h | S1.17 | Casing **Physio@Home** (D-9) | R-050, R-064 |
| S2.6 | Products hero + tabbed switcher | `products/page.tsx` hero (H1 "Three ventures, one vision", gradient on "one vision") + `TabbedProducts` (Radix Tabs → pill tabs) + `hooks/useProductTabs` (`?product=` deep-link sync) | 1.5h | S2.5 | Arrow-key/ Home/End tab nav; `aria-selected`; URL param round-trips; panel = two-column (label/title/desc/stats-or-tags/CTA left) | R-063, R-064 |
| S2.7 | CSS mock previews | `ProductMockup` ×3: browser-dashboard (Eco), content/social grid (One), mobile booking screen (Physio@Home) | 2h | S2.6 | Pure CSS/SVG, `aria-hidden`; ≤760px stacks under panel; timeboxed — simplify, don't gold-plate | R-065 |

### Day 8 (Wed) — Products II + About I
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S2.8 | Spotlight | dark `PhysioSpotlight` ("Physio@Home — healthcare reimagined" + supporting line) | 0.5h | S2.5 | Gold eyebrow, white H2, navy bg | R-066 |
| S2.9 | About data | `lib/data/`: story, tiles, mission/vision, values ×4, quality ×4, team ×7, roadmap ×4 | 1h | S1.17 | 7 roles verbatim; 4 milestones w/ years 2025/2025/2026/2026 | R-068–R-074 |
| S2.10 | Story + tiles + mission | About hero ("people behind" gradient) · `StoryBlock` ("From a chautari to a digital powerhouse") · `InfoTiles` 2×2 alternating teal/navy/white/gold (2025 · 3 · Kathmandu · 7+) · `MissionVision` side-by-side | 2h | S2.9 | Tile colors alternate exactly; **7+** team stat (D-1) | R-067–R-070 |

### Day 9 (Thu) — About II
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S2.11 | Values + quality + team | `ValuesGrid` (Passion/Creativity/Excellence/Collaboration) · dark `QualityTrust` (ISO 9001 Ready, Data Protection, Global Delivery, Pan-Nepal Network) · `TeamGrid` ×7 initials avatars, `id="team"` | 2h | S2.9 | "Meet the Team →" from Home lands on anchor; cards a11y-labeled | R-071–R-073 |
| S2.12 | Roadmap timeline | `Roadmap`: centered vertical line, alternating L/R cards, green dots, gold year pills; single-column <760px | 2.5h | S2.9 | Uses `<ol>` semantics; line is decorative (aria-hidden); alternation flips correctly; reduced-motion shows content statically | R-074 |
| S2.13 | About tail | `ClosingCta variant="dark"` ("Want to join our journey?" + "Get in Touch →") | 0.5h | S2.4 | | R-075 |

### Day 10 (Fri) — Integration & tests
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S2.14 | Cross-page polish | G1/G2 feedback fixes; breakpoint sweep on /services /products /about | 2h | S2.13 | No overflow/hit-target issues at 375/760/1024/1440 | — |
| S2.15 | Test batch 2 | Playwright: tabs keyboard+deep-link, mobile nav, page titles; Vitest data-integrity (7 roles, 4 milestones, 6 sectors, 6 industries, 3 tiers) | 2h | S2.13 | All green; data tests lock spec counts | — |

**S2 capacity:** Day 6 = 4.5 h · Day 7 = 5.5 h · Day 8 = 3.5 h · Day 9 = 5 h · Day 10 = 4 h → **22.5 h core + 7.5 h slack** (absorbs G1 feedback + mockup timebox overruns).

---

## 5. SPRINT 3 — Contact, Backend & SEO (Mon Oct 12 – Fri Oct 16)

**Goal:** The contact form works end-to-end, all spec-implied routes exist, and the site is fully findable/shareable.
**R-IDs in scope:** R-076–R-082 + D-3/D-4/D-5 routes + SEO/perf work.
**Exit criteria:** form submits via real email in preview; honeypot + rate-limit proven by test; 9 routes live; Lighthouse SEO = 100; **Gate G3** content/copy sign-off requested.

### Day 11 (Mon) — Core logic (business layer, TDD-friendly)
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S3.1 | Core modules | `lib/core/env.ts` (zod-validated) · `validation.ts` (contact schema + honeypot field) · `rate-limit.ts` (per-IP window) · `mailer.ts` (Resend + Nodemailer adapter + dev logger) · `submit.ts` pipeline | 2.5h | S1.11 | Plain TS, zero React imports; unit tests for: schema accept/reject ×6 cases, rate-limit window, honeypot trip | — |
| S3.2 | Server action | `app/actions/contact.ts` | 1h | S3.1 | Thin wrapper; returns typed `{ok}\|{errors}`; never trusts client (re-parse); tests for contract | — |

### Day 12 (Tue) — Form UI + page
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S3.3 | Contact form | `hooks/useContactForm` (RHF + zodResolver + useActionState) · `ContactForm` (Name, Email, Subject, **Project-Type pill tags** multi-select, Message, Send) | 3h | S3.2 | Inline errors linked `aria-describedby`; pills `aria-pressed`; `aria-live` status; pending state; Enter submits | R-079 |
| S3.4 | Contact page | hero ("conversation" gradient) · `ContactInfo` ×4 · `DirectLines` ×4 dept emails · two-column: form ‖ `MapPlaceholder` + dark `FaqCallout` → /faq + `ResponseTimes` (24h / 2–3 days / same day) | 2.5h | S3.3 | Spec layout exact; map decorative | R-076–R-082 |

### Day 13 (Wed) — E2E + ancillary routes
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S3.5 | Form e2e | Playwright: happy path (mock provider), invalid inputs, honeypot silent-drop | 1.5h | S3.4 | 3 scenarios green | — |
| S3.6 | FAQ page | `lib/data/faq.ts` + `/faq` (6–8 Q&A incl. response times, pricing, Physio@Home) | 1.5h | S3.4 | Accordion a11y (or static list); noindex not needed — public | D-3 |
| S3.7 | Blog + legal | `/blog` index (3 teaser posts → full cards) · `/privacy` + `/terms` stubs | 1.5h | S3.4 | Reuses `BlogTeaser` data; zero dead links | D-4, D-5 |

### Day 14 (Thu) — SEO
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S3.8 | Metadata | per-page `generateMetadata`: title template `%s · Digital Chautari`, descriptions (§16 drafts), canonicals, robots | 1.5h | S2.13 | Unique title+description ×9 routes | — |
| S3.9 | OG + icons | `app/api/og/route.tsx` (ImageResponse, brand gradient + page title) · default OG · favicon/apple-icon set | 1.5h | S3.8 | og:image 1200×630 renders per page; validated in card validators | — |
| S3.10 | Structured data | JSON-LD: `Organization`, `LocalBusiness` (Kathmandu), `WebSite` | 1h | S3.8 | Rich-results test passes | — |

### Day 15 (Fri) — Integrity
| ID | Task | Deliverable | Est | Deps | AC | R-IDs |
|---|---|---|---|---|---|---|
| S3.11 | Link audit | `tests/unit/links.ts` — crawl all internal hrefs | 1h | S3.7 | 0 broken internal links | — |
| S3.12 | Error/loading UX | `not-found.tsx` (on-brand 404 w/ CTA home) · `error.tsx` | 1h | S2.13 | 404 styled, recoverable | — |
| S3.13 | SEO pass | fix findings; add `sitemap.ts`, `robots.ts`, `manifest.ts` if not yet | 1.5h | S3.8–S3.10 | Lighthouse SEO = 100 | — |

**S3 capacity:** Day 11 = 3.5 h · Day 12 = 5.5 h · Day 13 = 4.5 h · Day 14 = 4 h · Day 15 = 3.5 h → **21 h core + 9 h slack**.

---

## 6. SPRINT 4 — Hardening & Launch (Mon Oct 19 – Fri Oct 23)

**Goal:** Every quality gate green; production live and verified.
**Exit criteria:** §7 gates table fully green; matrix R-001–R-082 signed off; deployed; handover docs delivered; **Gate G4** launch approval.

### Day 16 (Mon)
| ID | Task | Deliverable | Est | AC | R-IDs |
|---|---|---|---|---|---|
| S4.1 | Full matrix verification | Run site vs traceability matrix; log discrepancy list | 2.5h | Every R-row checked on preview deploy; discrepancies filed | all |
| S4.2 | Fix batch A | Highest-impact discrepancies | 2h | Re-verified | per list |

### Day 17 (Tue)
| ID | Task | Deliverable | Est | AC |
|---|---|---|---|---|
| S4.3 | Fix batch B + visual polish | remaining + G3 copy sign-off applied | 2h | matrix clean |
| S4.4 | E2E completion | all-route navigation ×3 (GSAP leak/regression check), reduced-motion emulation suite, 760px sweep | 2.5h | suite green |

### Day 18 (Wed)
| ID | Task | Deliverable | Est | AC |
|---|---|---|---|---|
| S4.5 | axe full scan | 9 routes | 1.5h | 0 violations |
| S4.6 | Lighthouse CI budgets | perf≥95 · a11y≥95 · BP≥95 · SEO=100, wired into CI | 1h | budgets enforced on PR |
| S4.7 | Perf tuning | only if under budget: font/GSAP-island/image audit | 1.5h | budgets met |

### Day 19 (Thu)
| ID | Task | Deliverable | Est | AC |
|---|---|---|---|---|
| S4.8 | Production deploy | Vercel project, prod env (zod-validated at boot), domain | 2h | boot fails fast on bad env; https live |
| S4.9 | Post-deploy smoke | live URL pass; **real-email form test**; OG validators; security headers (HSTS, CSP, X-Frame-Options…) via next.config | 1.5h | checklist signed |

### Day 20 (Fri)
| ID | Task | Deliverable | Est | AC |
|---|---|---|---|---|
| S4.10 | Placeholder sweep | grep `⟨TBC⟩` → content-request list to client | 1h | list sent |
| S4.11 | Handover pack | README (run/build/deploy/env) · content-editing guide (`lib/data` tour) · as-built vs plan notes | 2h | stakeholder can change copy unaided |
| S4.12 | Review & retro | demo recording, retro notes (what to keep/change), archive | 1h | delivered |

**S4 capacity:** Day 16 = 4.5 h · Day 17 = 4.5 h · Day 18 = 4 h · Day 19 = 3.5 h · Day 20 = 4 h → **20.5 h core + 9.5 h slack**. **Reserved buffer:** Oct 26–27 (only consumed via risk triggers §11).

---

## 7. Quality Gates Summary (checked at the stated milestones)

| Gate | When | Criteria | Tool |
|---|---|---|---|
| CI | every PR | lint + typecheck + unit + build | GitHub Actions |
| Motion | every motion-touching PR | reduced-motion emulation shows static content | Playwright emulation |
| A11y | S1 (Home) → then every new page batch | 0 axe violations | axe-playwright |
| Perf | end S1/S2 quick; end S3/S4 budgeted | ≥90 → then ≥95 mobile | Lighthouse CI |
| Matrix | end S4 (S4.1) | R-001–R-082 verified | manual + checklist |
| Form | end S3 | happy/invalid/honeypot + live email | Playwright + inbox |
| SEO | end S3 | SEO=100, sitemap/robots/OG/JSON-LD valid | Lighthouse + validators |
| Launch | S4.9 | smoke checklist on prod | manual |

---

## 8. Ceremonies & Communication (solo-friendly)

- **Daily async update** (5 min, end of day): done / next / blockers, posted to project thread.
- **Sprint demo:** end of each sprint — 3–5 min recording or annotated screenshots vs PDF side-by-side.
- **Stakeholder gates:** G1 styleguide (Day 3), G2 inner pages (Day 10), G3 content/copy (Day 15), G4 launch approval (Day 19). 24h SLA; work continues on next unblocked task while awaiting.
- **Retro:** end of S4 (S4.12) — velocity vs estimate, gate pass rates, what to change.

---

## 9. Roles

| Role | Who | Responsibilities |
|---|---|---|
| Developer | you | all build tasks, CI, deploys, demo artifacts |
| Stakeholder / client | Digital Chautari rep | gates G1–G4, content for `⟨TBC⟩` items, domain/DNS |
| Designer consult (optional) | spec author | contrast-adjustment approval (A-1/A-2), gradient word choices D-8 |

---

## 10. Backlog (pull only if slack after sprint exit criteria — stretch, never core)

SplitText letter-animation on hero gradient word (GSAP, free) · ScrollSmoother · Plausible/GoatCounter privacy-first analytics · Cloudflare Turnstile on form · real OpenStreetMap embed replacing map placeholder · per-post OG images · CMS for `lib/data` (e.g., contentlayer-style) · visual regression (Playwright screenshots) · blog post bodies.

## 11. Risk Register & Trigger→Action

| Risk | Likelihood | Trigger | Action (consume slack → then buffer days) |
|---|---|---|---|
| Node/env breakage on machine | low | S1.1 fails | fall back to nvm-managed Node 22 in project shell; CI unaffected |
| Token/styleguide rework after G1 | med | G1 objections | S2 Day-10 slack absorbs; tokens are centralized so changes are Layer-2 only |
| CSS mock previews gold-plating | med | S2.7 > 2h | timebox: ship simplified mock, move remainder to backlog |
| Timeline alternation bugs | med | S2.12 overrun | simplify to single-side on all breakpoints (spec-compliant fallback), note deviation |
| Email provider account delay | med | no Resend key by Day 11 | ship with dev-logger adapter + staging log review; swap provider post-launch |
| Stakeholder gate latency | med | >24h SLA | proceed on next unblocked task; G4 cannot be skipped |
| Content placeholders unresolved | high | S4.10 list unanswered | launch with clearly-marked placeholders; swap-in is data-file-only (no code) |

## 12. Content-Request Log (running, lives in repo `CONTENT-TODO.md`)

Seeded from design plan §16: tagline, emails (hello + 4 dept), phone, business hours, testimonial people/quotes, team names, blog dates/titles, product CTAs/links, legal contact details. Every task that adds a `⟨TBC⟩` appends here (DoD rule 6).

## 13. Velocity & Tracking

| Sprint | Core h | Slack h | Tasks | Carry-over policy |
|---|---|---|---|---|
| S1 | 28 | 2 | 20 | none — S2 depends on tokens/chrome |
| S2 | 22.5 | 7.5 | 15 | polish tasks may slip to S4 |
| S3 | 21 | 9 | 13 | SEO extras may slip to S4 Day 18 |
| S4 | 20.5 | 9.5 | 12 | nothing slips — buffer days |

Track daily: tasks Done / In-Progress, gate status, risk register deltas — 2 minutes in the async update.

---

## Appendix A — Task → R-ID coverage check

Every R-001–R-082 appears in at least one sprint task (S1: R-002–R-055 · S2: R-056–R-075 · S3: R-076–R-082 + ancillary D-3/4/5 · S4: full re-verification S4.1). Brand/context R-001 is carried by content modules S1.17 and verified at S4.1.

## Appendix B — Environment & config

| Env | Purpose | Vars |
|---|---|---|
| dev | local | none required (mailer logs) |
| preview | Vercel PR deploys | `RESEND_API_KEY?`, `CONTACT_TO_EMAIL?` |
| prod | live | `NEXT_PUBLIC_SITE_URL`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY` (or `SMTP_*`) — validated by `lib/core/env.ts` at boot |
