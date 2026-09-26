# Digital Chautari — Website Build Plan

**Source spec:** `frontend-task.pdf` (5 pages, Google Docs export, supplied 2026-09-26)
**Deliverable:** Production-grade marketing website — 5 core pages + ancillary routes, Next.js frontend **and** backend
**Plan date:** 2026-09-26 · **Status:** Draft for approval

---

## 1. Executive Summary

Digital Chautari is a creative-technology company in Kathmandu, Nepal (digital marketing, content creation, health-tech software). We will build a fully responsive, animated, accessible marketing site of five pages — **Home, Services, Products, About, Contact** — exactly per the supplied design spec, using the current (2026) best-practice stack:

- **Next.js 16.2 (App Router, Turbopack, React 19, TypeScript strict)** — the spec mandates "Next.js (frontend and backend)"; App Router with Server Components is the 2026 default and gives us a static-first marketing site with server-side form handling.
- **Tailwind CSS v4** with a layered, CSS-first theming system (`@theme` primitive → semantic → component tokens, §5.0) that encodes **every color, size, radius, shadow, and spacing value from the spec verbatim**.
- **GSAP 3 + ScrollTrigger** (per client direction) for scroll reveals, staggering, and page motion — fully free since GSAP 3.13 (all plugins incl. SplitText/ScrollSmoother), React-first via the `@gsap/react` `useGSAP()` hook, with `gsap.matchMedia()` gating everything on `prefers-reduced-motion`.
- **Strict separation of concerns (§7)** — presentation components contain zero business logic; content, business rules, and server mutations live in dedicated layers.
- **Server Actions + Zod + react-hook-form** for the contact form (validation shared client/server).
- **Vitest + Testing Library + Playwright + axe + Lighthouse CI** for quality gates.

The PDF contains one **embedded image that text extraction misses**: the full **typography scale table** (H1 → eyebrow). It is recovered and incorporated in §5.3. Every requirement in the PDF is traced line-by-line in the **Traceability Matrix (§20)** — nothing from the doc is omitted.

**Estimated effort:** ~10–13 focused working days (solo), phased in §19.

---

## 2. Source Spec Inventory (everything the PDF contains)

| # | Spec section | Contents |
|---|---|---|
| 1 | Brand Overview | Company identity, location, three service pillars |
| 2 | Color Palette | 12 named colors + gradient headline treatment + 5 pastel icon-chip backgrounds |
| 3 | Typography | Sora/Inter, weights, base size/color/line-height |
| 3 (embedded image, page 2) | **Typography scale table** — 7 roles × size/weight/font/usage (not in extracted text; recovered via image analysis) |
| 4 | Layout & Spacing | Container, section rhythm, grid gaps, radius scale, shadows, button specs |
| 5 | Global Components | Header, Hero pattern, Stat bar, Dark banners, Cards, Footer |
| 6 | Motion & Interaction | Page fades, staggered scroll reveals, hover lift, reduced-motion |
| 7 | Page-by-page | Home (10 sections), Services (6), Products (3), About (8), Contact (4) |

---

## 3. Approaches Considered

| | Approach | Pros | Cons | Verdict |
|---|---|---|---|---|
| **A** | **Next.js 16 App Router + Tailwind v4 layered tokens + GSAP/ScrollTrigger (useGSAP) + Radix primitives (Tabs) + Server Actions** | Tokens live in CSS as single source of truth; RSC keeps JS payload tiny; first-class metadata/sitemap/OG-image APIs; server-side form handling with zero API-route boilerplate | GSAP is imperative — contained by declarative `<Reveal>`/`<StaggerGroup>` wrappers and `useGSAP()` cleanup rules | ✅ **Recommended** |
| B | Next.js 16 + CSS Modules + hand-rolled IntersectionObserver animations | Smallest bundle; no animation lib | Re-implements design tokens twice (CSS vars + no utility gen); far more manual CSS for a 5-page grid-heavy design; slower and less consistent | Rejected |
| C | Next.js 16 + shadcn/ui component kit, heavily re-themed | Pre-built accessible components | shadcn's default aesthetic/structure fights this fully bespoke spec (custom stat bars, dark banners, timeline, tabs with mock previews); most components would be rewritten anyway | Rejected (borrow patterns only) |

**Animation library (per client direction — GSAP):** GSAP 3 (npm `gsap` + `@gsap/react`) is now 100% free including all formerly premium plugins. We use **core + ScrollTrigger only** (SplitText/ScrollSmoother noted as optional upgrades for the hero headline if the designer wants letter-level animation or smooth scrolling — both respect reduced-motion via `matchMedia`). Motion/Framer Motion was considered and dropped at client request.

**Sub-decisions (recommendation in bold):**
- **Package manager:** pnpm via corepack (fast, strict, disk-efficient). npm acceptable fallback.
- **Lint/format:** ESLint 9 flat config + typescript-eslint + `eslint-config-next` (note: Next 16 removed `next lint`; run `eslint` directly) + Prettier with `prettier-plugin-tailwindcss`. (Biome is faster but weaker Next.js integration.)
- **Email for contact form:** Resend API + React Email template (modern, simple). Fallback: Nodemailer SMTP if the client has existing SMTP.
- **Deployment:** Vercel (zero-config, native `ImageResponse` OG images). Alternative: self-hosted Node 22 in Docker.
- **Icons:** `lucide-react` (consistent stroke icons) — the spec's only literal emoji is 🚀 in the Home eyebrow, which we keep verbatim.

---

## 4. Environment & Prerequisites (current machine gaps)

| Requirement | Needed | Current | Action |
|---|---|---|---|
| Node.js | **≥ 20.9 (Next 16 hard requirement)**; recommend **22 LTS** | v18.19.1 ❌ | Install Node 22 LTS (nvm or system) before scaffolding |
| npm | ships with Node | **missing** ❌ | Restored by Node install; then `corepack enable` for pnpm |
| Git | required | not a repo (workspace) | `git init` inside new project dir |
| Network | Google Fonts fetch at build (next/font) | — | If offline, self-host via `@fontsource-variable/sora` / `inter` |

---

## 5. Design System & Tokens

### 5.0 Theming architecture (proper token system — three layers)

All styling flows through **one** Tailwind v4 `@theme` block in `app/globals.css`. No hard-coded hex values, arbitrary Tailwind values, or inline styles anywhere in components. Layers:

```
Layer 1 — Primitive tokens      --dc-teal-500: #0F9488;  --dc-navy-900: #0B1220; …
                                (raw palette exactly as named in the PDF)
Layer 2 — Semantic tokens       --color-surface: var(--dc-paper);
                                --color-surface-dark: var(--dc-navy-900);
                                --color-text-primary / --color-text-muted / --color-text-on-dark;
                                --color-border-default / --color-border-on-dark;
                                --color-action / --color-action-hover / --color-action-contrast;
Layer 3 — Component tokens      --card-radius: 12px; --card-padding: 22px;
                                --btn-radius: 8px; --pill-radius: 16px;
                                --shadow-card-hover: 0 16px 30px -18px rgba(16,24,38,.2);
```

**Rules:**
1. Tailwind v4 `@theme` generates both CSS variables and utilities (`bg-surface`, `text-muted`, `border-card`, `rounded-card` …) from these layers — utilities are derived, never hand-written.
2. Components consume **semantic/component tokens only** — never primitives. Re-theming (e.g., a future brand refresh) touches Layer 2/3 alone.
3. **Dark navy sections** are a *scheme*, not a restyle: `DarkSection` sets `data-scheme="dark"`, and Layer-2 tokens re-map inside `[data-scheme="dark"] { --color-surface: var(--dc-navy-900); --color-text-primary: #fff; … }`. Cards/eyebrows/buttons inside automatically adapt — this is what keeps the 10+ dark banners, spotlights, and the roadmap consistent from one definition.
4. The accessibility adjustments A-1/A-2 (§6) are implemented purely as Layer-2 remaps (`--color-action → #0D7F76`) — trivially reversible.
5. Typography (§5.3) and spacing (§5.4) follow the same layering (`--text-h1`, `--section-padding-*`, container widths).

### 5.1 Color tokens (verbatim from spec §2)

Defined once in `app/globals.css` inside Tailwind v4's `@theme` block → generates utilities (`bg-primary`, `text-muted`, `border-line`, etc.) and CSS variables (`--color-primary` …).

| Token | Hex | Spec usage |
|---|---|---|
| `primary` (Teal) | `#0F9488` | Primary buttons, links, active nav state, icon accents |
| `primary-dark` | `#0B6F66` | Hover states, dark-section accent text |
| `gold` (Accent) | `#E0A930` | Highlight word in headlines, "Most Popular" badges, dark-section eyebrow tags |
| `leaf` | `#7FAE3A` | Secondary gradient stop in headline text, tertiary accent |
| `ink` | `#101826` | Primary body/heading text |
| `navy` | `#0B1220` | Stats banners, footer, "how we work", dark CTA backgrounds |
| `navy-card` | `#101D2B` | Cards placed on navy backgrounds |
| `navy-border` | `#223140` | Borders on dark cards |
| `paper` | `#FBFBF9` | Page background |
| `line` | `#E7E5DF` | Default card/input borders |
| `muted` | `#5B6472` | Body copy, captions, subtext |

**Gradient headline treatment** — key phrases in H1s: `linear-gradient(90deg, #0F9488, #E0A930, #7FAE3A)`, clipped to text (`bg-clip-text text-transparent`). Implemented as `<GradientText>`.
**Per-page gradient phrases** — the spec applies this to "key phrases in H1s" globally but names only Home's; the rest are proposed (confirm with designer): Services → "drive growth" · Products → "one vision" · About → "people behind" · Contact → "conversation".

**Pastel icon-chip backgrounds** (behind icons in feature cards — rotated across repeating icon cards for variety, **no new hues added**):

| Chip | Hex |
|---|---|
| mint | `#E7F5EA` |
| pale teal | `#E7F2F4` |
| pale gold | `#FDF1DE` |
| pale lilac | `#F4E9F6` |
| pale pink | `#FDEEF0` |

Rotation helper: `chipTone(i) = PASTELS[i % 5]`.

### 5.2 Additional derived tokens (from spec §4–§7 usage)

- Hero background: soft **mint → paper** full-bleed gradient (`#E7F5EA → #FBFBF9`) + subtle **radial teal/gold glow** top-right (two layered `radial-gradient`s at low opacity, `pointer-events-none`, `aria-hidden`).
- Closing CTA panel: **teal → blue** gradient rounded panel (`linear-gradient(135deg, #0F9488, #2563EB)`).
- Logo mark: rounded square, teal gradient (`#0F9488 → #0B6F66`), white "DC".

### 5.3 Typography (spec §3 + embedded scale table from PDF page 2)

Fonts via `next/font/google` (self-hosted at build, `display: swap`, CSS variables `--font-sora`, `--font-inter`):
- **Sora** weights 600/700/800 — headings
- **Inter** weights 400/500/600 — body
- Base body: **16px, `#101826`, line-height 1.5**

**Scale table (recovered from the embedded image — apply exactly):**

| Role | Size | Weight / Font | Notes |
|---|---|---|---|
| H1 (hero) | **46px desktop / 32px mobile** | **800 Sora** | Gradient phrase clipped to text |
| H2 (section title) | **28–30px** | **700 Sora** | |
| H3 (card title) | **16–17px** | **600–700 Sora** | |
| Body / lede paragraph | **15–17px** | **400 Inter** | |
| Small / caption | **12–13px** | **500 Inter** | |
| Button label | **14–15px** | **600 Inter** | |
| Eyebrow / tag label | **11–13px** | **600 Inter, uppercase or small-caps, letter-spacing 0.02em** | |

Tokenized as `text-h1` … `text-eyebrow` utilities in `@theme` (with responsive `--text-h1--size` handling).

### 5.4 Layout & spacing tokens (spec §4)

| Token | Value |
|---|---|
| Container max width | **1120px**, centered |
| Side padding | **40px** desktop · **22px** mobile (≤760px) |
| Section padding (standard) | **64px** top/bottom |
| Section padding (tight) | **48px** |
| Section padding (hero) | **84px** top / **48px** bottom |
| Grid gap | **20px** between cards (grids of 2/3/4 columns by content count) |
| Radius: icon chips | **9–10px** |
| Radius: cards/inputs | **12px** (standardized) |
| Radius: pill buttons/badges | **14–20px** |
| Radius: standard buttons | **8px** (spec §4 "Buttons" line) |
| Card rest state | **1px solid `#E7E5DF`**, borderline flat |
| Card hover | lift **4–5px** (`translateY(-4px)`), shadow **`0 16px 30px -18px rgba(16,24,38,0.2)`** |
| Primary button | solid teal, white text, **13px/24px padding, 8px radius** |
| Ghost/secondary button | white bg, 1px border, same padding |
| Mobile breakpoint | **≤760px** (per spec — used for header collapse and side padding) |

Components: `<Container>`, `<Section spacing="standard|tight|hero">`.

### 5.5 Component-level motion tokens (spec §6)

| Token | Value |
|---|---|
| Page/section transition | fade + slide, **~0.45s ease** |
| Scroll reveal | upward fade, **stagger ~70ms/item** |
| Card hover lift | `translateY(-4 → -5px)` + shadow growth |
| Icon chip on card hover | scale **1.08×** |
| Reduced motion | **all motion respects `prefers-reduced-motion`** |

---

## 6. Accessibility Audit (computed against the spec's palette)

Computed WCAG contrast ratios for every spec pairing:

| Pairing | Ratio | WCAG AA (4.5:1 normal / 3:1 large+UI) | Action |
|---|---|---|---|
| `muted #5B6472` on `paper #FBFBF9` | ≈ 5.8:1 | ✅ pass | — |
| `ink #101826` on `paper` | ≈ 15:1 | ✅ pass | — |
| `gold #E0A930` on `navy #0B1220` (dark eyebrows) | ≈ 8.9:1 | ✅ pass | — |
| white on `navy` / `navy-card` | > 14:1 | ✅ pass | — |
| **white on `primary #0F9488`** (buttons) | **≈ 3.75:1** | ⚠️ fails normal-text AA (14–15px label) | See A-1 |
| **`gold #E0A930` on `paper`** (gradient mid-stop on light H1s) | **≈ 2.1:1** | ⚠️ fails 3:1 large-text | See A-2 |
| `primary` as link text on paper | ≈ 3.7:1 | ⚠️ borderline for body-size links | See A-3 |

**Recommended adjustments (small, spec-preserving — flag to designer, default ON):**
- **A-1** Introduce one button-surface shade `--color-primary-strong: #0D7F76` (computed ≈ 4.9:1 with white) used *only* for solid button backgrounds and text links; `#0F9488` stays everywhere else (chips, icons, gradients, accents). Hover goes to `#0B6F66`.
- **A-2** On light backgrounds, the headline-gradient's gold stop darkens to `#B9821B` (≈ 3.3:1, passes large-text). Vivid `#E0A930` is kept on dark sections.
- **A-3** Body-size teal links get `underline-offset` styling and use `primary-strong`.

Other a11y commitments (WCAG 2.2 AA): semantic landmarks; skip-to-content link; visible `:focus-visible` rings (2px, offset 2px, `primary`); keyboard-operable Tabs (Radix) with `aria-selected`; mobile nav as focus-trapped disclosure with `aria-expanded`; form labels visible, errors linked via `aria-describedby`, status via `aria-live`; decorative glows/mock previews `aria-hidden`; touch targets ≥ 44px (spec button padding already yields ≈ 45–50px); motion gated by `prefers-reduced-motion`; lang `en`; axe scan clean on all pages.

---

## 7. Architecture, Layering & Separation of Concerns

### 7.1 Logic-separation principles (per client direction)

Each concern lives in exactly one layer, with dependencies pointing one way (UI → hooks/actions → core → data):

| Layer | Path | Contains | Forbidden |
|---|---|---|---|
| **Routing / pages** | `app/**/page.tsx` | Composition of sections, route metadata | Any business rules, copy strings, fetching logic |
| **Presentation** | `components/**` | Pure render from props — visual structure, variants, tokens | No data fetching, no validation rules, no formatting of business data beyond display mapping; zero hard-coded copy |
| **Client behavior** | `hooks/**` (client) | `useContactForm`, `useProductTabs`, GSAP animation hooks (`useReveal`) | No business rules — orchestration only |
| **Server mutations** | `app/actions/**` | `"use server"` functions — thin: validate → delegate → return state | No rendering, no direct SMTP/SDK calls |
| **Business logic (core)** | `lib/core/**` | Validation schemas (Zod), rate limiter, mailer, submission pipeline, env validation — plain TS, unit-testable without React | No React/DOM imports |
| **Content (data)** | `lib/data/**` | All copy, nav, pricing, team, posts, roadmap, FAQ as typed constants | No logic beyond pure derivations |
| **Animation** | `lib/gsap/**` + `components/motion/**` | GSAP registration, shared tweens/timelines/variants, ScrollTrigger config, `matchMedia` gates | No content or business knowledge |

Result: components are dumb and swap-safe; business rules are testable in plain Node; animation is centralized and swappable; copy edits never touch JSX.

### 7.2 File structure

```
digital-chautari/
├── app/
│   ├── layout.tsx                 # fonts, base metadata, header/footer, skip link
│   ├── template.tsx               # route-change fade+slide (~0.45s)
│   ├── globals.css                # Tailwind v4: @theme token layers (§5.0), base styles
│   ├── page.tsx                   # Home (10 sections)
│   ├── services/page.tsx
│   ├── products/page.tsx          # tabbed switcher
│   ├── about/page.tsx             # incl. #team anchor
│   ├── contact/page.tsx
│   ├── blog/page.tsx              # (addition — see §17)
│   ├── faq/page.tsx               # (addition — spec links to it)
│   ├── privacy/page.tsx · terms/page.tsx   # legal stubs (footer Legal links)
│   ├── not-found.tsx · error.tsx
│   ├── actions/contact.ts         # "use server" — submitContact() (thin)
│   ├── api/og/route.tsx           # ImageResponse OG images
│   ├── sitemap.ts · robots.ts · manifest.ts
│   └── icon.svg · apple-icon.png
├── components/
│   ├── layout/  SiteHeader · MobileNav · SiteFooter · Container · Section
│   ├── ui/      Button · Card · IconChip · Eyebrow · GradientText · StatBar ·
│   │            PillTag · Badge · ChecklistItem · SectionHeading
│   ├── sections/ (one per home/inner-page section, §11–§15)
│   └── motion/  Reveal · StaggerGroup (client boundary — GSAP-powered)
├── hooks/       useContactForm · useMobileNav · useActiveSection
├── lib/
│   ├── core/    validation.ts (Zod) · rate-limit.ts · mailer.ts · env.ts · submit.ts
│   ├── gsap/    setup.ts (register) · reveals.ts (shared tweens + matchMedia gates)
│   ├── data/    site.ts · services.ts · products.ts · team.ts · testimonials.ts ·
│   │            posts.ts · roadmap.ts · faq.ts   (single source of truth for copy)
│   └── utils.ts                   # cn(), chipTone(), formatDate()
├── public/                        # favicon set, fonts fallback, illustrations
└── tests/  unit/ · e2e/           # Vitest + RTL · Playwright + axe
```

**Rendering strategy:** all pages statically prerendered (RSC, zero client JS except islands: header nav, tabs, form, motion wrappers). Only the server action is dynamic. No client-side data fetching. Content lives in typed data modules (`lib/data/*`) — copy changes never touch components.

---

## 8. Global Components (spec §5 → implementation)

| Spec component | Implementation |
|---|---|
| **Header** — sticky, white/blur (`backdrop-blur`, translucent white), logo = rounded teal-gradient square with "DC" + wordmark + tagline; center nav **Home / Services / Products / About / Contact** (active state = teal, `aria-current`); right teal **"Contact Us"** button; collapses to **hamburger dropdown < 760px** | `SiteHeader` (server) + `MobileNav` (client disclosure). Tagline copy proposal: "Creative Technology Company" |
| **Hero pattern (every page)** — full-bleed soft mint→paper gradient + subtle radial teal/gold glow top-right; centered/left eyebrow pill + big gradient-word H1 + lede; max text width **660–720px** | `Hero` section component; `HeroBackdrop` decorative layer |
| **Stat bar** — single bordered white card, **3–4 equal segments, vertical dividers**, each icon chip + bold number + small label | `StatBar` / `StatSegment`; responsive stack ≤760px |
| **Dark banner sections** — navy bg, gold eyebrow tag, white H2; used for stats, process, testimonial-adjacent breaks, final CTAs | `DarkSection` wrapper + `SectionHeading variant="dark"` |
| **Cards** — white, 1px border, **12px radius, 22px padding**, icon chip top-left, H3, muted body | `Card` (with `variant="dark"` → `navy-card` bg + `navy-border`) |
| **Footer** — navy bg, **4-column** (brand blurb, Company links, Services links, Legal links), divider line, centered copyright | `SiteFooter`; links from `lib/data/site.ts`; copyright year dynamic (2025–2026) |
| **Closing CTAs** — global spec routes final CTAs to **navy dark banners** (navy usage: "dark CTA backgrounds"; dark banners "used for … final CTAs"); Home's page spec overrides with a **teal→blue gradient rounded panel** | `ClosingCta` — `variant="gradient"` (Home) · `variant="dark"` (Services, About) |

---

## 9. Motion & Interaction Plan — GSAP (spec §6; client direction: GSAP)

**Packages:** `gsap` + `@gsap/react`. Registered once in `lib/gsap/setup.ts` (`gsap.registerPlugin(useGSAP, ScrollTrigger)`), imported only by client islands. Everything animates via **shared tween definitions** in `lib/gsap/reveals.ts` so timing lives in one place.

1. **Page transitions:** `app/template.tsx` remounts per navigation → CSS keyframe fade + translateY(8px→0), **0.45s ease** (no JS needed; disabled under reduced-motion media query).
2. **Scroll reveals:** `<StaggerGroup>` (client) wraps each grid/list and runs one timeline inside `useGSAP()` (auto-cleanup on unmount/route change):
   - `ScrollTrigger.batch(items, { start: "top 88%", once: true })` → `gsap.to(items, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.07 })` — **70ms stagger**, upward fade, exactly per spec.
   - `<Reveal>` is the single-item wrapper over the same shared tween — declarative API, GSAP underneath.
3. **Card hover:** pure CSS (`transition transform/shadow`; group-hover translateY(-4px) + spec shadow; **icon-chip `scale-[1.08]`** on `group-hover`). No JS, no GSAP needed.
4. **Reduced motion — hard gate:** `lib/gsap/reveals.ts` wraps all tweens in `gsap.matchMedia()`:
   - `(prefers-reduced-motion: reduce)` → no transforms/stagger; content is simply visible (opacity 1) — never hidden behind an animation that won't run.
   - Global CSS `@media (prefers-reduced-motion: reduce)` additionally kills the template transition and CSS hover transforms.
5. **Optional upgrades (flagged, off by default):** SplitText for the hero gradient phrase, ScrollSmoother for page scroll — both are free now, both behind the same `matchMedia` gate. Enabled only if the designer requests them, to keep initial JS lean.
6. GSAP is confined to `components/motion/*` + `lib/gsap/*` client islands; all content stays in RSC. Core + ScrollTrigger ≈ 24KB gz, loaded only where reveals exist.

---

## 10. Backend: Contact Form (spec: "Next.js frontend and backend")

- **Schema (`lib/core/validation.ts`)** — shared Zod schema: `name` (≥2), `email`, `subject` (≥3), `projectTypes` (array of enum pills, ≥1), `message` (≥10, ≤2000), honeypot `company` (must be empty).
- **Server Action `submitContact`** (`app/actions/contact.ts`, `"use server"` — thin orchestrator): delegates to `lib/core/submit.ts`, which re-parses with Zod (never trust client), applies honeypot + per-IP rate limit (`lib/core/rate-limit.ts`), and sends via `lib/core/mailer.ts` (Resend; Nodemailer fallback); returns typed `{ ok } | { errors }`.
- **Client (`ContactForm` + `hooks/useContactForm`):** react-hook-form + `zodResolver` (instant UX, same schema) **+** `useActionState` for submission; project types as **clickable pill tags** (multi-select, `role="group"`, `aria-pressed`); success/error banner with `aria-live="polite"`; pending state on Send button.
- **Env:** `CONTACT_TO_EMAIL`, `RESEND_API_KEY` (or `SMTP_*`), validated in `lib/core/env.ts`; dev fallback logs the payload.

---

## 11. Page Spec — HOME (spec §7, all 10 sections)

1. **Hero** — Eyebrow pill "🚀 Welcome to Digital Chautari" · H1 "We build **digital bridges** between ideas and impact" (gradient on "digital bridges") · lede · buttons **"Explore Services →"** (primary) + **"View Products"** (ghost) · **stat bar: 3 Products / 6+ Team Members / 100% Commitment**.
2. **Feature strip** — 4 cards: **Growth-Driven, Creative-First, Tech-Powered, Client-Centric** (pastel chips rotate).
3. **Who We Are** — H2 "**A Chautari where ideas meet execution**" + 2 brand-story paragraphs + **2×2 checklist** (Creative Strategy, Brand Storytelling, Full-Stack Engineering, Health-Tech Expertise) + **"Meet the Team →"** button; right side = **2×2 grid of service teaser cards** (Digital Marketing, Content Creation, Software Development, Branding & Design) → `/services`.
4. **Dark stats banner** (navy) — **250+ Projects Delivered · 40+ Happy Clients · 1M+ Content Views · 98% Client Retention**.
5. **Products teaser** — H2 "**Three ventures, one vision**" — 3 cards (icon, category label, description, "Learn more →"): **Eco Creative Marketing Agency · One Content Creation Studio · Physio@Home** → `/products`.
6. **Sectors we serve** — 6 industry cards: **Healthcare, E-Commerce, Real Estate, Education, Tourism & Hospitality, Media & Publishing**.
7. **Dark "Our 4-step process"** — numbered icon cards on navy: **Discover, Design, Develop, Deliver**.
8. **Testimonials** — 3 quote cards, **5-star ratings**, name + title/company.
9. **Blog teaser** — H2 "Latest from our blog" — 3 article cards: colored placeholder image block, category tag, date/read-time, title, excerpt, "Read more →".
10. **Closing CTA** — **teal-to-blue gradient rounded panel**, "**Ready to build something extraordinary together?**" + **"Start a Project →"** + **"View Services"** buttons.

## 12. Page Spec — SERVICES (6 blocks)

1. **Hero** — "**Services that *drive growth***" (gradient on "drive growth").
2. **Service categories** — 3 rows; left = icon + title + description, right = **2×2 sub-service grid**:
   - **Digital Marketing**: SEO & SEM · Social Media Marketing · Paid Advertising · Analytics & Reporting *(verbatim from spec)*
   - **Content Creation** (sub-services proposed, spec gives "e.g." only for row 1): Video Production · Copywriting & Blogs · Graphic Design · Content Strategy
   - **Software Development** (proposed): Web App Development · Mobile App Development · UI/UX Design · Maintenance & Support
3. **Pricing** — 3 tiers: **Starter Rs 15,000/mo · Professional Rs 45,000/mo ("Most Popular", dark card) · Enterprise (Custom)**; each with feature checklist + CTA.
4. **Industries** — "Who we work with" — 6 simple icon+label cards (Healthcare, E-Commerce, Real Estate, Education, Tourism, Media).
5. **Dark "Why work with us"** — 6 checklist items (verbatim): Dedicated project manager · Agile development cycle · Transparent pricing · Post-launch support · Scalable architecture · Cross-platform expertise.
6. **Closing CTA** *(navy dark-banner variant)* — "**Let's find the right service for you**" + **"Book a Consultation →"**.

## 13. Page Spec — PRODUCTS (3 blocks)

1. **Hero** — "**Three ventures, *one vision***" (gradient on "one vision").
2. **Tabbed product switcher** — **pill tabs** for Eco Creative Marketing Agency / One Content Creation Studio / Physio@Home (Radix Tabs, keyboard accessible, deep-linkable via `?product=`); selected panel = two-column: category label, title, description, stats-or-tags, CTA; **mock UI preview panel on the right** (pure CSS/SVG mockups — browser dashboard for Eco, social/video grid for One, mobile booking screen for Physio@Home).
3. **Dark spotlight banner** — "**Physio@Home — healthcare reimagined**" + supporting line.

## 14. Page Spec — ABOUT (8 blocks)

1. **Hero** — "**The *people behind* Digital Chautari**" (gradient on "people behind").
2. **Story block** — "**From a chautari to a digital powerhouse**" narrative + **2×2 stat/info tiles in alternating teal/navy/white/gold**: 2025 Founded · 3 Products · Kathmandu HQ · 7+ Team Members.
3. **Mission & Vision** — two side-by-side cards.
4. **Values** — 4 cards: **Passion, Creativity, Excellence, Collaboration**.
5. **Dark "Committed to quality & trust"** — 4 cards: **ISO 9001 Ready, Data Protection, Global Delivery, Pan-Nepal Network**.
6. **Team roles** — 7 cards: **Founder & CEO, Co-Founder & COO, Front-End Developer, Back-End Developer, Marketing Lead, Sales Executive, Business Development Officer** (initials avatars; `id="team"` anchor for Home's "Meet the Team →").
7. **Dark roadmap** — alternating left/right timeline, **centered vertical line, green dots, gold year pills**: **The Idea (2025) · First Products (2025) · Health-Tech Entry (2026) · Company Registration (2026)** (single-column left-aligned on mobile).
8. **Closing CTA** *(navy dark-banner variant)* — "**Want to join our journey?**" + **"Get in Touch →"**.

## 15. Page Spec — CONTACT (4 blocks)

1. **Hero** — "**Let's start a *conversation***" (gradient on "conversation").
2. **Contact info cards** — Address (Kathmandu, Nepal) · Email · Phone · Business Hours.
3. **Direct lines** — "Reach the right team" — 4 department cards (**Marketing, Content Studio, Software Dev, Business Dev**) each with a direct email.
4. **Two-column block** — left = **form** (Name, Email, Subject, **Project Type as clickable pill tags**, Message, Send button); right = **map placeholder card** + dark "**Need quick answers? Visit FAQ page →**" callout (→ `/faq`) + **Response Time list** (Email 24h · Proposals 2–3 days · Urgent same day).

---

## 16. Content Draft (ready-to-paste copy; `⟨placeholder⟩` = confirm with client)

- **Tagline (header):** "Creative Technology Company" ⟨confirm⟩
- **Home hero lede:** "Digital Chautari is a creative technology company in Kathmandu, Nepal — blending digital marketing, content creation, and health-tech software to turn ambitious ideas into measurable impact."
- **Who We Are P1:** "In Nepal, a chautari is a shady platform where travelers rest, share stories, and continue wiser. Digital Chautari is that gathering point for the digital age — marketers, creators, and engineers helping ambitious ideas find their footing."
- **Who We Are P2:** "Founded in Kathmandu in 2025, we run three ventures of our own while partnering with clients across healthcare, commerce, and media — so the advice we give you is practiced, not theoretical."
- **Process blurbs:** Discover — "We dig into your goals, market, and users before a single pixel." · Design — "Strategy becomes structure: wireframes, brand, and messaging." · Develop — "We build, test, and iterate in agile sprints." · Deliver — "Launch, measure, and keep improving after release."
- **Testimonials (placeholder people):** Aarya Shrestha, Founder, Himalaya Organics · Bibek Thapa, Marketing Head, Everest Eats · Dr. Sunita Maharjan, Physiotherapist — quote copy drafted, marked for replacement with real quotes.
- **Blog posts (placeholders):** "Why Nepali brands win with local-first content" (Content · 5 min) · "SEO in 2026: what actually moves rankings now" (Marketing · 7 min) · "Building Physio@Home: lessons from health-tech in Nepal" (Engineering · 6 min).
- **Pricing features:** Starter — 1 campaign channel · 4 posts/mo content calendar · basic analytics report · email support. Professional — up to 3 channels · 12 content assets/mo · SEO + monthly reporting · dedicated manager · priority support. Enterprise — custom strategy & roadmap · full-scale production team · custom software development · SLA & 24/7 support.
- **Product panel stats/tags:** Eco — 40+ clients · 250+ campaigns · tags [SEO, Social, Paid Ads]; One — 1M+ views · 120+ videos · tags [Video, Design, Copy]; Physio@Home — 500+ sessions · 30+ therapists · 4.9★ · tags [Booking, Telehealth, iOS & Android].
- **Team names:** role cards ship with initials avatars (e.g., "Founder & CEO — A. Karki ⟨TBC⟩").
- **Contact details:** hello@digitalchautari.com.np ⟨TBC⟩ · +977 01-XXXXXXX ⟨TBC⟩ · Sun–Fri 10:00–18:00 NPT ⟨TBC⟩ · dept emails marketing@ / studio@ / dev@ / business@ ⟨TBC⟩.
- **Footer:** Company links (About Us, Products, Blog, Contact) · Services links (Digital Marketing, Content Creation, Software Development, Pricing → `#pricing`) · Legal links (Privacy Policy, Terms of Service) · brand blurb: "A creative technology company in Kathmandu — building digital bridges between ideas and impact."

---

## 17. Ancillary Routes (additions beyond the PDF — required to avoid dead links)

| Route | Why | Scope |
|---|---|---|
| `/faq` | Contact spec links to "FAQ page →" | 6–8 Q&A (services, pricing, process, Physio@Home, response times) |
| `/blog` | Home blog teaser "Read more →" needs targets | Index of the 3 teaser posts (cards reuse teaser data); post bodies out of scope |
| `/privacy`, `/terms` | Footer "Legal links" | Concise generated policy stubs |

---

## 18. Spec Inconsistencies & Decisions Log

| # | Conflict in PDF | Resolution (default) |
|---|---|---|
| D-1 | Home hero stat bar "**6+ Team Members**" vs About tiles/team "**7+**" (7 role cards exist) | Unify to **7+** everywhere (matches 7 team cards) — flag to client |
| D-2 | Radius: "14–20px for pill buttons/badges" vs buttons "8px radius" | Both kept as distinct tokens: standard buttons 8px; *pill* CTAs/badges/eyebrow pills 14–20px |
| D-3 | Contact links to FAQ page, but no FAQ page in spec | Build `/faq` (§17) |
| D-4 | Footer Legal column, no legal pages in spec | Build stubs `/privacy`, `/terms` |
| D-5 | Home blog teaser with no blog page | Build `/blog` index (§17) |
| D-6 | Button/link contrast fails AA with spec teal (§6 table) | `primary-strong #0D7F76` for text-on-teal surfaces (A-1); reversible via single token |
| D-7 | "Branding & Design" appears in Home teaser cards but not in Services categories | Keep as teaser card linking to `/services` (anchors to Content Creation row) |
| D-8 | Hero alignment ambiguous in spec ("centered/left-aligned eyebrow pill") | Default **left-aligned** on all pages (content-rich ledes); confirm with designer |
| D-9 | Spec casing is **"Physio@Home"** (3×, mixed case) — not "Physio@HOME" | Verbatim "Physio@Home" used everywhere (verified in cross-check 2026-09-26) |

---

## 19. Implementation Phases

| Phase | Scope | Exit criteria | Est. |
|---|---|---|---|
| **0. Environment** | Node 22 LTS, corepack/pnpm, `git init`, `create-next-app` (TS, App Router, Tailwind v4, Turbopack, ESLint flat), CI skeleton | `pnpm dev` renders default page; CI green | 0.5d |
| **1. Design system** | `globals.css` `@theme` token layers (§5.0), fonts, GSAP setup (`lib/gsap/`), `Button/Card/IconChip/Eyebrow/GradientText/Container/Section/StatBar/PillTag`, `Reveal/StaggerGroup`, storybook-style dev page | Every token visually verified against spec; stagger demo at 70ms | 1.5d |
| **2. Chrome** | `SiteHeader` (sticky blur, active nav, mobile hamburger <760px), `SiteFooter`, `template.tsx` transition, skip link, `not-found` | Header/footer pixel-close on 3 breakpoints | 1d |
| **3. Home** | All 10 sections (§11) with data modules | Full Home page matches spec; reveals stagger correctly | 2d |
| **4. Services** | 6 blocks incl. pricing with dark "Most Popular" card (§12) | — | 1d |
| **5. Products** | Tabbed switcher + CSS mock previews + dark spotlight (§13) | Tabs keyboard + deep-link + reduced-motion verified | 1d |
| **6. About** | 8 blocks incl. alternating timeline (§14) | — | 1d |
| **7. Contact + backend** | Form + pills + server action + mailer + env (§10, §15) | Happy path + validation + honeypot tests pass | 1d |
| **8. Ancillary** | `/faq`, `/blog`, `/privacy`, `/terms` | No dead links site-wide | 0.5d |
| **9. SEO/perf** | Metadata per page, `sitemap.ts`, `robots.ts`, `manifest.ts`, `api/og` ImageResponse, JSON-LD (Organization + LocalBusiness + WebSite) | Lighthouse SEO 100 | 0.5d |
| **10. QA hardening** | Playwright e2e + axe scans, Vitest units, Lighthouse CI budgets (perf ≥95, a11y ≥95, CLS <0.05, LCP <2.0s), 375/768/1440 + 760px breakpoint sweep, visual polish | All gates green; matrix (§20) signed off | 1.5d |
| **11. Deploy** | Vercel (or Docker), prod env vars, smoke test, handover README | Live URL verified | 0.5d |

---

## 20. Traceability Matrix — every requirement in the PDF

**Legend:** ✅ planned · Location = file/component. Verified in Phase 10 against this table.

### Brand (§1)
| ID | Requirement | Location |
|---|---|---|
| R-001 | Digital Chautari, creative-tech co., Kathmandu; marketing + content + health-tech | Copy `lib/data/site.ts`; all pages |

### Colors (§2)
| ID | Requirement (hex → usage) | Location |
|---|---|---|
| R-002 | Primary Teal `#0F9488` — buttons, links, active nav, icon accents | `--color-primary`; `Button`, nav active |
| R-003 | Primary Dark `#0B6F66` — hover, dark-section accent text | `--color-primary-dark` |
| R-004 | Gold `#E0A930` — headline highlight, Most-Popular badge, dark eyebrows | `--color-gold` |
| R-005 | Leaf `#7FAE3A` — gradient stop, tertiary accent | `--color-leaf` |
| R-006 | Ink `#101826` — body/heading text | `--color-ink` |
| R-007 | Navy `#0B1220` — stats banners, footer, how-we-work, dark CTAs | `--color-navy`; `DarkSection` |
| R-008 | Navy Card `#101D2B` — cards on navy | `--color-navy-card`; `Card variant=dark` |
| R-009 | Navy Border `#223140` — dark-card borders | `--color-navy-border` |
| R-010 | Paper `#FBFBF9` — page background | `--color-paper`; `body` |
| R-011 | Line `#E7E5DF` — default card/input borders | `--color-line` |
| R-012 | Muted `#5B6472` — body copy, captions, subtext | `--color-muted` |
| R-013 | H1 gradient `90deg #0F9488→#E0A930→#7FAE3A` clipped to text | `GradientText` |
| R-014 | Pastel chips mint `#E7F5EA` / pale teal `#E7F2F4` / pale gold `#FDF1DE` / pale lilac `#F4E9F6` / pale pink `#FDEEF0`, rotated, no new hues | `PASTELS[]` + `chipTone()` in `IconChip` |

### Typography (§3 + embedded table)
| ID | Requirement | Location |
|---|---|---|
| R-015 | Sora 600/700/800 headings | `next/font` `--font-sora` |
| R-016 | Inter 400/500/600 body | `next/font` `--font-inter` |
| R-017 | Base 16px `#101826`, lh 1.5 | `body` base styles |
| R-018 | H1 hero 46px (32 mobile) 800 Sora | `--text-h1` |
| R-019 | H2 28–30px 700 Sora | `--text-h2` |
| R-020 | H3 16–17px 600–700 Sora | `--text-h3` |
| R-021 | Body/lede 15–17px 400 Inter | `--text-body` |
| R-022 | Small/caption 12–13px 500 Inter | `--text-small` |
| R-023 | Button 14–15px 600 Inter | `Button` |
| R-024 | Eyebrow 11–13px 600 Inter, uppercase/small-caps, ls 0.02em | `Eyebrow` |

### Layout & spacing (§4)
| ID | Requirement | Location |
|---|---|---|
| R-025 | 1120px centered; 40px / 22px (≤760px) side padding | `Container` |
| R-026 | 64px standard / 48px tight / 84px-top 48px-bottom hero section padding | `Section` prop |
| R-027 | 20px grid gaps; 2/3/4-col grids by count | grid utilities |
| R-028 | Radius 9–10px chips · 12px cards/inputs · 14–20px pills/badges · 8px buttons | radius tokens |
| R-029 | Cards 1px `#E7E5DF` rest; hover lift 4–5px + `0 16px 30px -18px rgba(16,24,38,.2)` | `Card` CSS |
| R-030 | Primary btn solid teal/white 13px/24px pad 8px radius; ghost white + 1px border | `Button` variants |

### Global components (§5)
| ID | Requirement | Location |
|---|---|---|
| R-031 | Sticky header, white/blur, DC teal-gradient logo + wordmark + tagline | `SiteHeader` |
| R-032 | Center nav Home/Services/Products/About/Contact + right "Contact Us" teal btn | `SiteHeader` |
| R-033 | Hamburger dropdown < 760px | `MobileNav` |
| R-034 | Hero pattern: mint→paper bg + radial teal/gold glow TR; eyebrow pill + gradient H1 + lede; 660–720px max text | `Hero` |
| R-035 | Stat bar: bordered white card, 3–4 equal segments, dividers, chip+number+label | `StatBar` |
| R-036 | Dark banners: navy, gold eyebrow, white H2 (stats/process/breaks/CTAs) | `DarkSection` |
| R-037 | Cards: white 1px border 12px radius 22px padding, chip TL, H3, muted body | `Card` |
| R-038 | Footer: navy, 4 cols (brand/Company/Services/Legal), divider, centered © | `SiteFooter` |

### Motion (§6)
| ID | Requirement | Location |
|---|---|---|
| R-039 | Page/section fade+slide ~0.45s ease | `template.tsx` (CSS) |
| R-040 | Scroll reveal upward fade, 70ms stagger | `Reveal`/`StaggerGroup` — GSAP ScrollTrigger |
| R-041 | Hover lift −4→−5px + shadow; chip scale 1.08× | `Card` CSS |
| R-042 | All motion respects `prefers-reduced-motion` | `gsap.matchMedia()` gate (§9.4) |

### Home (§7)
| ID | Requirement | Location |
|---|---|---|
| R-043 | Eyebrow "🚀 Welcome to Digital Chautari" | `HomeHero` |
| R-044 | H1 with gradient "digital bridges" + lede + 2 buttons | `HomeHero` |
| R-045 | Stat bar 3 Products / 6+ Team (→7+, D-1) / 100% Commitment | `StatBar` |
| R-046 | Feature strip 4: Growth-Driven, Creative-First, Tech-Powered, Client-Centric | `FeatureStrip` |
| R-047 | Who We Are: H2 + 2 paras + 2×2 checklist + Meet-the-Team btn | `WhoWeAre` |
| R-048 | Right 2×2 service teasers incl. Branding & Design | `WhoWeAre` |
| R-049 | Dark stats: 250+/40+/1M+/98% | `DarkStatsBanner` |
| R-050 | Products teaser "Three ventures…" 3 cards w/ icon+category+desc+Learn more | `ProductsTeaser` |
| R-051 | Sectors: 6 industry cards | `SectorsGrid` |
| R-052 | Dark 4-step process Discover/Design/Develop/Deliver (numbered) | `ProcessSteps` |
| R-053 | Testimonials: 3 quotes, 5-star, name+title/company | `Testimonials` |
| R-054 | Blog teaser: 3 cards w/ colored placeholder, tag, date/read-time, excerpt, Read more | `BlogTeaser` |
| R-055 | Closing CTA teal→blue gradient panel + 2 buttons | `ClosingCta` |

### Services (§7)
| ID | Requirement | Location |
|---|---|---|
| R-056 | Hero "Services that drive growth" (gradient on "drive growth") | `services/page.tsx` |
| R-057 | 3 category rows (icon+title+desc left; 2×2 sub-services right) | `ServiceCategoryRow` |
| R-058 | DM sub-services verbatim: SEO & SEM, SMM, Paid Ads, Analytics & Reporting | `lib/data/services.ts` |
| R-059 | Pricing 3 tiers Rs 15,000 / Rs 45,000 (Most Popular, dark) / Custom + checklists + CTAs | `PricingTable` |
| R-060 | Industries "Who we work with" 6 cards | `IndustriesGrid` |
| R-061 | Dark why-us: 6 verbatim checklist items | `WhyWorkWithUs` |
| R-062 | Closing CTA + "Book a Consultation →" (navy dark-banner variant) | `ClosingCta` |

### Products (§7)
| ID | Requirement | Location |
|---|---|---|
| R-063 | Hero "Three ventures, one vision" (gradient on "one vision") | `products/page.tsx` |
| R-064 | Pill tab switcher; panel = category, title, desc, stats/tags, CTA | `TabbedProducts` (Radix) |
| R-065 | Mock UI preview panel right side | `ProductMockup` (CSS) |
| R-066 | Dark spotlight "Physio@Home — healthcare reimagined" + line | `PhysioSpotlight` |

### About (§7)
| ID | Requirement | Location |
|---|---|---|
| R-067 | Hero "The people behind Digital Chautari" (gradient on "people behind") | `about/page.tsx` |
| R-068 | Story "From a chautari to a digital powerhouse" + narrative | `StoryBlock` |
| R-069 | 2×2 tiles alternating teal/navy/white/gold: 2025/3/Kathmandu/7+ | `InfoTiles` |
| R-070 | Mission & Vision 2 cards | `MissionVision` |
| R-071 | Values 4: Passion, Creativity, Excellence, Collaboration | `ValuesGrid` |
| R-072 | Dark quality: ISO 9001 Ready, Data Protection, Global Delivery, Pan-Nepal Network | `QualityTrust` |
| R-073 | Team 7 role cards (verbatim roles) | `TeamGrid` + `#team` |
| R-074 | Dark roadmap: alternating L/R, centered line, green dots, gold year pills; 4 verbatim milestones | `Roadmap` |
| R-075 | Closing CTA "Want to join our journey?" + "Get in Touch →" (navy dark-banner variant) | `ClosingCta` |

### Contact (§7)
| ID | Requirement | Location |
|---|---|---|
| R-076 | Hero "Let's start a conversation" (gradient on "conversation") | `contact/page.tsx` |
| R-077 | Info cards: Address/Email/Phone/Business Hours | `ContactInfo` |
| R-078 | "Reach the right team" 4 dept cards w/ direct emails | `DirectLines` |
| R-079 | Form: Name, Email, Subject, Project-Type pill tags, Message, Send | `ContactForm` |
| R-080 | Map placeholder card | `MapPlaceholder` |
| R-081 | Dark "Need quick answers? Visit FAQ page →" callout | `FaqCallout` → `/faq` |
| R-082 | Response Time list: Email 24h / Proposals 2–3 days / Urgent same day | `ResponseTimes` |

---

## 21. Quality Gates & Definition of Done

- [ ] Every matrix row R-001…R-082 visually verified at 375 / 760 / 1024 / 1440px
- [ ] Lighthouse (mobile): Performance ≥ 95 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO = 100
- [ ] Core Web Vitals: LCP < 2.0s · CLS < 0.05 · INP < 200ms
- [ ] axe-core: zero violations on all 9 routes
- [ ] Keyboard-only walkthrough: nav, tabs, form, mobile menu
- [ ] `prefers-reduced-motion` emulation: no non-essential motion
- [ ] Contact form e2e: happy path, field errors, honeypot, rate limit
- [ ] No dead links (incl. footer legal, FAQ, blog targets)
- [ ] Metadata/OG/sitemap/robots/JSON-LD validated
- [ ] `pnpm lint · typecheck · test · e2e` green in CI

## 22. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Node 18 → 16-incompat environment | Phase 0 installs Node 22 LTS first; CI pins 22 |
| GSAP leaks/tweens surviving route changes (imperative pitfall) | All tweens created inside `useGSAP()` (auto-revert on unmount); shared definitions only in `lib/gsap/reveals.ts`; e2e navigates all routes repeatedly checking for orphaned state |
| Spec teal/gold fails AA contrast | Token-level fix (A-1/A-2) in Layer 2 only, reversible; flagged to designer |
| Placeholder content (emails, phones, names, blog, testimonials) shipped accidentally | All placeholders marked `⟨TBC⟩` in data files + pre-launch grep check |
| Form spam on public deploy | Honeypot + rate limit (+ optional Turnstile toggle) |
| Google Fonts fetch at build in restricted CI | Self-host via fontsource fallback |

## 23. Research Sources

- [GSAP — fully free, all plugins (Webflow product)](https://gsap.com/) · `npm i gsap @gsap/react` (docs: /docs/v3/Installation)
- [Next.js 16.2 / Turbopack default](https://dev.to) · [Next 16 features roundup](https://techdrifting.com) · [Node ≥20.9 + TS ≥5.1 requirements](https://javascript.plainenglish.io) · [Cache Components](https://shubhra.dev)
- [Tailwind v4 CSS-first `@theme`](https://eastondev.com) · [design-token guide](https://dev.to) · [v4 patterns](https://clawindex.app)
- [prefers-reduced-motion: MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) · [web.dev reduced motion](https://web.dev/articles/prefers-reduced-motion) — applied via `gsap.matchMedia()` gates
- [Server Actions best practices & security checklist](https://www.shamanth.dev) · [Zod shared-schema pattern](https://github.com) · [Nodemailer in Next.js](https://sherazmanzoor.hashnode.dev)
