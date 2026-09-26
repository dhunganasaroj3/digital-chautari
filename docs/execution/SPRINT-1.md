# SPRINT 1 — Foundation & Home (executes after EXECUTION.md ritual)

**Goal:** design system real, site chrome done, Home page complete and pixel-faithful.
**Do tasks strictly in order S1.0 → S1.20.** Times are budgets, not deadlines — quality gates win over speed.

---

## S1.0 — Initialize progress tracking (10 min)
Create `~/projects/digital-chautari/PROGRESS.md` per EXECUTION.md §2 with CURRENT SPRINT: 1 and S1.0 ✅.
Create `CONTENT-TODO.md` at repo root, seeded:

```markdown
# Content TODO (items needing real client content)
- Header tagline (currently: "Creative Technology Company")
- Footer copyright company legal name
```

## S1.1 — Install Node 22 LTS
Try, in order, first that works:
```bash
nvm install 22 && nvm use 22 && nvm alias default 22          # if nvm exists
# else:
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs
```
DONE WHEN: `node -v` prints v22.x. Put `22` in `.nvmrc`. Note the exact version in PROGRESS.md.

## S1.2 — Scaffold the app (repo root IS the app root)
```bash
cd ~/projects/digital-chautari
corepack enable && corepack prepare pnpm@latest --activate
pnpm create next-app@latest . --ts --tailwind --eslint --app --turbopack --no-src-dir --import-alias "@/*" --use-pnpm --yes
git init && git add -A && git commit -m "chore: scaffold next.js 16 app (S1.2)"
```
If the directory is non-empty because of `docs/`, `PROGRESS.md`, `CONTENT-TODO.md` — that is expected; keep them.
DONE WHEN: `pnpm dev` serves the default page at http://localhost:3000 and `pnpm build` exits 0.

## S1.3 — Tooling hardening
1. `pnpm add -D prettier prettier-plugin-tailwindcss simple-git-hooks lint-staged`
2. `.prettierrc`: `{ "plugins": ["prettier-plugin-tailwindcss"], "semi": true, "singleQuote": false, "printWidth": 100 }`
3. `.editorconfig`: root=true, utf-8 lf, indent 2, final newline.
4. `package.json` additions: `"engines": { "node": ">=22" }`, scripts `"format": "prettier --write .", "typecheck": "tsc --noEmit"`, and:
```json
"simple-git-hooks": { "pre-commit": "pnpm lint-staged" },
"lint-staged": { "*.{ts,tsx,css}": ["prettier --write"] }
```
then `pnpm exec simple-git-hooks`.
5. `tsconfig.json`: ensure `"strict": true` and add `"noUncheckedIndexedAccess": true`.
DONE WHEN: a test commit triggers the hook; `pnpm typecheck` passes.

## S1.4 — CI workflow (exact file)
`.github/workflows/ci.yml`:
```yaml
name: ci
on: { pull_request: {}, push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
```
Create a GitHub repo is NOT required; commit the file. DONE WHEN: file committed.

## S1.5 — The token system (MOST IMPORTANT FILE IN THE PROJECT)
Replace the whole of `app/globals.css` with exactly this (then never write a hex anywhere else):

```css
@import "tailwindcss";

@theme {
  /* ── Layer 1: primitives (PDF palette, verbatim) ───────────── */
  --color-dc-teal-500: #0f9488;
  --color-dc-teal-600: #0b6f66;
  --color-dc-gold-500: #e0a930;
  --color-dc-gold-600: #b9821b;    /* A-2: gold stop for gradients on LIGHT bg */
  --color-dc-leaf-500: #7fae3a;
  --color-dc-ink-900: #101826;
  --color-dc-navy-900: #0b1220;
  --color-dc-navy-800: #101d2b;
  --color-dc-navy-700: #223140;
  --color-dc-paper-50: #fbfbf9;
  --color-dc-line-200: #e7e5df;
  --color-dc-muted-500: #5b6472;
  --color-dc-mint-100: #e7f5ea;
  --color-dc-palteal-100: #e7f2f4;
  --color-dc-palgold-100: #fdf1de;
  --color-dc-pallilac-100: #f4e9f6;
  --color-dc-palpink-100: #fdeef0;
  --color-dc-action-600: #0d7f76;  /* A-1: solid button/link surface (AA w/ white) */

  /* ── Layer 2: semantic (components use ONLY these) ─────────── */
  --color-surface: var(--color-dc-paper-50);
  --color-surface-card: #ffffff;
  --color-text-primary: var(--color-dc-ink-900);
  --color-text-muted: var(--color-dc-muted-500);
  --color-border-default: var(--color-dc-line-200);
  --color-action: var(--color-dc-action-600);
  --color-action-hover: var(--color-dc-teal-600);
  --color-on-action: #ffffff;
  --color-accent-gold: var(--color-dc-gold-500);
  --color-accent-leaf: var(--color-dc-leaf-500);
  --color-chip-1: var(--color-dc-mint-100);
  --color-chip-2: var(--color-dc-palteal-100);
  --color-chip-3: var(--color-dc-palgold-100);
  --color-chip-4: var(--color-dc-pallilac-100);
  --color-chip-5: var(--color-dc-palpink-100);

  /* ── Layer 3: component tokens ─────────────────────────────── */
  --radius-chip: 10px;      /* spec: 9–10 → 10 */
  --radius-card: 12px;
  --radius-btn: 8px;
  --radius-pill: 16px;      /* spec: 14–20 → 16 */
  --shadow-card-hover: 0 16px 30px -18px rgba(16, 24, 38, 0.2);
  --spacing-section: 64px;  /* standard */
  --spacing-section-tight: 48px;
  --spacing-section-hero-top: 84px;
  --spacing-section-hero-bottom: 48px;
  --spacing-gutter: 40px;   /* desktop side padding */
  --spacing-gutter-mobile: 22px;

  /* custom spec breakpoint (760px, NOT Tailwind's 768 md) */
  --breakpoint-nav: 760px;

  /* ── Typography (pinned exact values inside the spec's ranges) ─
     pattern: mobile value, then *-lg used as nav:text-…-lg        */
  --text-h1: 2rem;          --text-h1--line-height: 1.15;        /* 32px */
  --text-h1-lg: 2.875rem;   --text-h1-lg--line-height: 1.12;     /* 46px */
  --text-h2: 1.75rem;       --text-h2--line-height: 1.25;        /* 28px */
  --text-h2-lg: 1.875rem;   --text-h2-lg--line-height: 1.22;     /* 30px */
  --text-h3: 1rem;          --text-h3--line-height: 1.4;         /* 16px */
  --text-h3-lg: 1.0625rem;  --text-h3-lg--line-height: 1.35;     /* 17px */
  --text-lede: 0.9375rem;   --text-lede--line-height: 1.6;       /* 15px */
  --text-lede-lg: 1.0625rem;--text-lede-lg--line-height: 1.6;    /* 17px */
  --text-small: 0.75rem;    --text-small--line-height: 1.5;      /* 12px */
  --text-small-lg: 0.8125rem;--text-small-lg--line-height: 1.5;  /* 13px */
  --text-btn: 0.875rem;     --text-btn--line-height: 1;          /* 14px */
  --text-btn-lg: 0.9375rem; --text-btn-lg--line-height: 1;       /* 15px */
  --text-eyebrow: 0.6875rem;--text-eyebrow--line-height: 1.4;    /* 11px */
  --text-eyebrow-lg: 0.8125rem;--text-eyebrow-lg--line-height: 1.4; /* 13px */

  --font-heading: var(--font-sora), "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), "Inter", ui-sans-serif, system-ui, sans-serif;
}

/* Dark scheme remap — set data-scheme="dark" on any navy section */
[data-scheme="dark"] {
  --color-surface: var(--color-dc-navy-900);
  --color-surface-card: var(--color-dc-navy-800);
  --color-text-primary: #ffffff;
  --color-text-muted: #a7b4c7;
  --color-border-default: var(--color-dc-navy-700);
}

@layer base {
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  body {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    font-size: 16px;               /* spec base */
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  :focus-visible { outline: 2px solid var(--color-dc-teal-500); outline-offset: 2px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important; scroll-behavior: auto !important;
  }
}
```

VERIFY: `grep -rnE '#[0-9A-Fa-f]{6}' app components | grep -v globals.css` → empty · dev server still boots.
NOTE: Tailwind v4 generates utilities straight from these tokens — always prefer `rounded-chip`, `rounded-card`, `rounded-btn`, `rounded-pill`, `shadow-card-hover`, `p-card` (from `--spacing-card`), `tracking-eyebrow`, `text-h1`/`nav:text-h1-lg`, `font-heading`, `font-body`, and the `nav:` breakpoint over arbitrary values.
DONE WHEN: ✓ verified · committed `feat(theme): three-layer token system (S1.5)`.

## S1.6 — Fonts
In `app/layout.tsx`:
```tsx
import { Sora, Inter } from "next/font/google";
const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
// <html lang="en" className={`${sora.variable} ${inter.variable}`}>
```
If the build machine is offline and the Google Fonts fetch fails: `pnpm add @fontsource-variable/sora @fontsource-variable/inter`, import them in `layout.tsx` instead, set the same CSS variables, note it in PROGRESS.md.
DONE WHEN: rendered headings use Sora (devtools computed font), body Inter; no layout shift on reload.

## S1.7 — Core UI primitives (`components/ui/`)
Install icons: `pnpm add lucide-react`.
Create (server components unless noted):
- `Container.tsx` — `<div className="mx-auto w-full max-w-[1120px] px-[22px] nav:px-10">` — wait, NO arbitrary values (rule 1). Instead use tokens: since max width/gutters are tokens, add utilities in globals `@utility container-dc { … }`? **Simplest compliant approach:** add to `@theme`: `--container-dc: 1120px;` then class `max-w-(--container-dc)` is still not a named utility. → Define custom utilities at the end of globals.css:
```css
@utility container-dc { margin-inline: auto; width: 100%; max-width: var(--container-dc); padding-inline: var(--spacing-gutter-mobile); }
@media (min-width: 760px) { .container-dc { padding-inline: var(--spacing-gutter); } }
```
with `--container-dc: 1120px;` added into `@theme` Layer 3. `Container` renders `<div className="container-dc">`.
- `Section.tsx` — props `spacing?: "standard" | "tight" | "hero"`, `dark?: boolean`, `id?: string`; renders `<section id data-scheme={dark ? "dark" : undefined} className={spacing classes}>` with a `container-dc` inner wrapper. Standard: `py-16 nav:py-[64px]`→ again no arbitrary: use Tailwind spacing scale `py-16` (64px) exactly matches; tight `py-12` (48px) matches; hero `pb-12 pt-[84px]` — 84 is not on the default scale, so define utilities:
```css
@utility section-standard { padding-block: var(--spacing-section); }
@utility section-tight { padding-block: var(--spacing-section-tight); }
@utility section-hero { padding-block: var(--spacing-section-hero-top) var(--spacing-section-hero-bottom); }
```
and in mobile-first spirit add the reduced paddings for <760 inside those utilities via media query (halve them: 32px / 32px / 56px+32px — write actual values `32px`, `56px` literals in these globals utilities; that is allowed, globals.css is the one place for constants).
- `Eyebrow.tsx` — pill: `inline-flex items-center gap-2 rounded-pill border border-border-default bg-surface-card px-3 py-1 font-body text-eyebrow-lg font-semibold uppercase tracking-[0.02em] text-text-muted`. Dark variant prop switches border/bg for navy (`border-border-default bg-transparent text-text-muted` — tokens remap automatically under `data-scheme="dark"`).
- `GradientText.tsx` — `<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, var(--color-dc-teal-500), var(--color-dc-gold-600), var(--color-dc-leaf-500))" }}>` — note `--color-dc-gold-600` (A-2) on light backgrounds; add prop `onDark` that swaps the middle stop to `--color-dc-gold-500`.
- `IconChip.tsx` — props `icon: LucideIcon`, `tone?: number`; tones map to `bg-chip-1..5` (rotate via index); renders 44px min square, `rounded-chip`, icon 20px `text-action`. Palette array lives in `lib/utils.ts`: `export const CHIP_TONES = ["bg-chip-1","bg-chip-2","bg-chip-3","bg-chip-4","bg-chip-5"] as const; export const chipTone = (i: number) => CHIP_TONES[i % 5];`
- `Badge.tsx` — small pill, gold bg `bg-accent-gold text-dc-navy-900 font-semibold` (for "Most Popular", year pills).
- `PillTag.tsx` — outlined pill for tags/project-type (S3 uses interactive variant; keep presentational here).
- `Button.tsx` (exact code):
```tsx
import Link from "next/link";
type Props = {
  href: string; children: React.ReactNode;
  variant?: "primary" | "ghost" | "ghostDark" | "pill";
  className?: string; onClick?: () => void;
};
export function Button({ href, children, variant = "primary", className = "", onClick }: Props) {
  const base = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn px-6 py-[13px] font-body text-btn nav:text-btn-lg font-semibold transition-transform duration-200 hover:-translate-y-0.5";
  const variants = {
    primary: "bg-action text-on-action hover:bg-action-hover",
    ghost: "border border-border-default bg-surface-card text-text-primary hover:border-action",
    ghostDark: "border border-border-default bg-transparent text-text-primary hover:border-action",
    pill: "rounded-pill",
  } as const;
  return <Link href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</Link>;
}
```
DONE WHEN: all render on the styleguide page (S1.10); focus ring visible on tab; 44px touch target.

## S1.8 — Card + StatBar
- `components/ui/Card.tsx` — props `dark?: boolean`, `className`. Classes: `group rounded-card border border-border-default bg-surface-card p-[22px] transition-[transform,box-shadow] duration-300 hover:-translate-y-[4px] hover:shadow-card-hover` — p-[22px] is a spec literal: put `--spacing-card: 22px` in @theme Layer 3 and use `p-card`; hover lift −4px: `hover:-translate-y-1` (4px, on scale) is fine. Children pattern: `<IconChip>` top-left, `<h3 className="font-heading text-h3 nav:text-h3-lg font-bold">`, `<p className="text-small-lg nav:text-base text-text-muted">`. On card hover the chip scales: wrap chip in a span with `transition-transform duration-300 group-hover:scale-[1.08]` (1.08 must be literal `scale-[1.08]` — arbitrary VALUES for transforms are the one tolerated exception? NO — keep zero-exception rule workable: add `--scale-chip-hover: 1.08` is not a Tailwind token. Pragmatic ruling: `group-hover:scale-105` is 1.05 not 1.08… **use `group-hover:[transform:scale(1.08)]`? That is an arbitrary property.** → Cleanest compliant: tiny utility in globals.css: `@utility chip-hover-scale { } .group:hover .chip-hover-scale { transform: scale(1.08); }` — write plain CSS `.group:hover .chip-scale { transform: scale(1.08); }` in globals.css and use class `chip-scale` on chips. Do that.
- `components/ui/StatBar.tsx` — one bordered white card `rounded-card border bg-surface-card` split into N equal segments: parent `grid grid-cols-1 nav:grid-cols-3` (or 4 — prop `count`), children segments `flex items-center gap-3 p-5`, vertical dividers via `nav:border-l nav:border-border-default` on segments except first (use `:not(:first-child)` logic in a `Segment` subcomponent with index prop; <760px: horizontal dividers `border-t`). Each segment: IconChip + `<p className="font-heading text-2xl font-extrabold">{value}</p>` + `<p className="text-small-lg text-text-muted">{label}</p>`.

## S1.9 — GSAP foundation (canonical pattern — ALL motion uses this)
`pnpm add gsap @gsap/react`
`lib/gsap/reveals.ts`:
```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export const REVEAL = { duration: 0.45, ease: "power2.out", stagger: 0.07, y: 16, start: "top 88%" } as const;
export function staggerReveal(scope: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const items = scope.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.set(items, { opacity: 0, y: REVEAL.y });
    ScrollTrigger.batch(items, {
      start: REVEAL.start, once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: REVEAL.duration, ease: REVEAL.ease, stagger: REVEAL.stagger, overwrite: true }),
    });
  });
  return () => mm.revert();
}
```
`components/motion/StaggerGroup.tsx`:
```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { staggerReveal } from "@/lib/gsap/reveals";
export function StaggerGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => { if (ref.current) return staggerReveal(ref.current); }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}
```
`components/motion/Reveal.tsx` — same but applies to its single child wrapper `<div data-reveal>`.
**Rule for every later task:** mark reveal items with `data-reveal`; wrap grids in `StaggerGroup`; never call `gsap` anywhere else; reduced-motion users simply never get the `gsap.set(0)` — content stays visible.
DONE WHEN: demo grid staggers ~70ms; DevTools rendering emulation "reduce" ⇒ everything visible, no transform; navigate away/back ⇒ no duplicated/ghost animations.

## S1.10 — Styleguide page `app/_dev/page.tsx`
`export const metadata = { robots: { index: false, follow: false } }`. Render: all 16 primitive swatches + semantic remaps on a `data-scheme="dark"` strip; full type scale rows with px labels; every primitive; a 6-card `StaggerGroup` demo grid; Button states. Used for human review — make labels small `text-small`.
DONE WHEN: page loads, every section labeled; screenshot 1440px saved to `docs/execution/shot-s1-styleguide.png` (use Playwright later; for now `pnpm dev` + manual check is fine — note in PROGRESS).

## S1.11 — Unit tests batch 1
`pnpm add -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom vite-tsconfig-paths`
`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({ test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"] }, plugins: [tsconfigPaths()] });
```
`tests/setup.ts`: `import "@testing-library/jest-dom/vitest";`
`package.json` script: `"test": "vitest run"`.
Tests: `tests/unit/utils.test.ts` (chipTone cycles 5), `tests/unit/button.test.ts` (renders primary/ghost classes), `tests/unit/statbar.test.ts` (renders 3 segments + labels), `tests/unit/reveals.test.ts` (REVEAL constants equal spec: duration 0.45, stagger 0.07 — guards drift).
DONE WHEN: `pnpm test` green.

## S1.12 — SiteHeader (`components/layout/SiteHeader.tsx`)
Sticky: `sticky top-0 z-50 border-b border-border-default bg-white/80 backdrop-blur-md` (white/80+blur IS the spec's "white/blur"; `bg-white/80` allowed as it is opacity of white, note in Decisions). Inner: `container-dc flex h-16 items-center justify-between gap-4`.
Left: logo — `<span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-dc-teal-500 to-dc-teal-600 font-heading text-sm font-extrabold text-white">DC</span>` + wordmark block: `<span className="font-heading text-base font-bold">Digital Chautari</span><span className="hidden text-small text-text-muted sm:block">Creative Technology Company</span>`.
Center nav (`hidden nav:flex`): links in order Home `/`, Services `/services`, Products `/products`, About `/about`, Contact `/contact`; active = `text-action font-semibold` + `aria-current="page"` (use `usePathname` → header must be a client component OR accept an `activePath` prop from layout server component — choose: make `SiteHeader` a client component for `usePathname` + `MobileNav` state; that's acceptable as chrome island).
Right: `hidden nav:block` + `<Button href="/contact" variant="primary">Contact Us</Button>`.
Hamburger button `nav:hidden` with `aria-expanded`, `aria-controls="mobile-nav"`, lucide `Menu`/`X` icons, accessible name "Open menu"/"Close menu".

## S1.13 — MobileNav
Client component; panel under header when open: vertical link list + Contact Us button. Focus trap: on open, focus first link; Tab cycles within panel; Esc closes and refocuses hamburger; `overflow-hidden` on `body` while open. Links close menu on activate.
DONE WHEN (S1.12+S1.13): at 759px hamburger shows, at 760px it doesn't; trap works by keyboard.

## S1.14 — SiteFooter + site data
`lib/data/site.ts`:
```ts
export const SITE = {
  name: "Digital Chautari",
  tagline: "Creative Technology Company",
  nav: [ { label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Products", href: "/products" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" } ],
  footer: {
    blurb: "A creative technology company in Kathmandu — building digital bridges between ideas and impact.",
    company: [ { label: "About Us", href: "/about" }, { label: "Products", href: "/products" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" } ],
    services: [ { label: "Digital Marketing", href: "/services#digital-marketing" }, { label: "Content Creation", href: "/services#content-creation" }, { label: "Software Development", href: "/services#software-development" }, { label: "Pricing", href: "/services#pricing" } ],
    legal: [ { label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" } ],
  },
} as const;
```
Footer markup: `<footer data-scheme="dark" className="section-tight bg-surface text-text-primary">` → container → `grid grid-cols-2 nav:grid-cols-4 gap-8` (brand col spans 2 on mobile: `col-span-2 nav:col-span-1`), headings `text-eyebrow-lg uppercase tracking-[0.02em] text-accent-gold`, links `text-small-lg text-text-muted hover:text-action`, then `mt-8 border-t border-border-default pt-6 text-center text-small text-text-muted` with `© 2025–{new Date().getFullYear()} Digital Chautari. All rights reserved.` (compute year, don't hardcode 2026).
DONE WHEN: 4 columns ≥760px, 2 columns below; divider + centered copyright.

## S1.15 — Hero section (`components/sections/Hero.tsx`)
Props: `eyebrow`, `title`, `gradient` (the words to wrap in GradientText — match by exact substring), `lede`, `children?` (buttons/statbar slot), `center?: boolean`.
Background (exact CSS — put in globals.css as `@utility hero-bg`):
```css
@utility hero-bg {
  background:
    radial-gradient(600px 300px at 85% -10%, color-mix(in srgb, var(--color-dc-teal-500) 14%, transparent), transparent 70%),
    radial-gradient(500px 260px at 95% 0%, color-mix(in srgb, var(--color-dc-gold-500) 10%, transparent), transparent 70%),
    linear-gradient(180deg, var(--color-dc-mint-100), var(--color-surface) 70%);
}
```
Section: `section-hero hero-bg` + decorative layer `aria-hidden pointer-events-none absolute inset-0`. Text column `max-w-[720px]`→ NO arbitrary: tokens again — add `--text-col: 660px; --text-col-lg: 720px;` to @theme Layer 3 and utilities `@utility text-col { max-width: var(--text-col);} @media (min-width:760px){ .text-col{ max-width: var(--text-col-lg);} }`. `center` prop → `mx-auto text-center` (left-aligned is the default per decision D-8).
H1: `font-heading text-h1 nav:text-h1-lg font-extrabold`, gradient words wrapped in `<GradientText>`.
DONE WHEN: matches at 4 widths; glow sits top-right; text column ≤720px.

## S1.16 — Page transition, skip link, root layout
`app/template.tsx`:
```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
```
globals.css:
```css
@keyframes page-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.page-enter { animation: page-enter 0.45s ease both; }
```
(reduced-motion block already kills it).
Skip link (first child of `<body>` in layout): `<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-action focus:px-4 focus:py-2 focus:text-on-action">Skip to content</a>` and `<main id="main">` wrapping children. Layout also renders `<SiteHeader/>`, `<SiteFooter/>`.
DONE WHEN: route change visibly fades+slides once; Tab shows skip link first.

## S1.17 — Home data modules (all copy verbatim below — do not reword)
`lib/data/home.ts`:
```ts
export const HERO = {
  eyebrow: "🚀 Welcome to Digital Chautari",
  title: "We build digital bridges between ideas and impact",
  gradient: "digital bridges",
  lede: "Digital Chautari is a creative technology company in Kathmandu, Nepal — blending digital marketing, content creation, and health-tech software to turn ambitious ideas into measurable impact.",
  primaryCta: { label: "Explore Services →", href: "/services" },
  ghostCta: { label: "View Products", href: "/products" },
  stats: [ { icon: "Package", value: "3", label: "Products" }, { icon: "Users", value: "7+", label: "Team Members" }, { icon: "Target", value: "100%", label: "Commitment" } ],
} as const;

export const FEATURES = [
  { icon: "TrendingUp", title: "Growth-Driven", body: "Every decision is measured against real business outcomes — traffic, leads, revenue." },
  { icon: "Sparkles", title: "Creative-First", body: "Design and storytelling lead, so your brand sounds as good as it performs." },
  { icon: "Cpu", title: "Tech-Powered", body: "Modern engineering and automation underpin everything we ship." },
  { icon: "HeartHandshake", title: "Client-Centric", body: "Collaborative process, transparent pricing, and support after launch." },
] as const;

export const WHO_WE_ARE = {
  title: "A Chautari where ideas meet execution",
  paragraphs: [
    "In Nepal, a chautari is a shady platform where travelers rest, share stories, and continue wiser. Digital Chautari is that gathering point for the digital age — marketers, creators, and engineers helping ambitious ideas find their footing.",
    "Founded in Kathmandu in 2025, we run three ventures of our own while partnering with clients across healthcare, commerce, and media — so the advice we give you is practiced, not theoretical.",
  ],
  checklist: ["Creative Strategy", "Brand Storytelling", "Full-Stack Engineering", "Health-Tech Expertise"],
  cta: { label: "Meet the Team →", href: "/about#team" },
  teasers: [
    { icon: "Megaphone", title: "Digital Marketing", href: "/services#digital-marketing" },
    { icon: "Clapperboard", title: "Content Creation", href: "/services#content-creation" },
    { icon: "Code2", title: "Software Development", href: "/services#software-development" },
    { icon: "Palette", title: "Branding & Design", href: "/services#content-creation" },
  ],
} as const;

export const DARK_STATS = [
  { icon: "FolderCheck", value: "250+", label: "Projects Delivered" },
  { icon: "Smile", value: "40+", label: "Happy Clients" },
  { icon: "Eye", value: "1M+", label: "Content Views" },
  { icon: "Repeat", value: "98%", label: "Client Retention" },
] as const;

export const PRODUCTS_TEASER = {
  title: "Three ventures, one vision",
  items: [
    { icon: "Sprout", category: "Marketing Agency", name: "Eco Creative Marketing Agency", body: "Performance-first digital marketing for purpose-led brands: SEO, social, and campaigns that compound.", href: "/products" },
    { icon: "Video", category: "Content Studio", name: "One Content Creation Studio", body: "A studio for scroll-stopping content — strategy, video, design, and copy produced under one roof.", href: "/products" },
    { icon: "HeartPulse", category: "Health-Tech Platform", name: "Physio@Home", body: "Physiotherapy that comes to you: book certified physiotherapists for at-home sessions across Nepal.", href: "/products" },
  ],
} as const;

export const SECTORS = [
  { icon: "Stethoscope", title: "Healthcare", body: "Patient-first digital experiences, from clinic sites to health-tech platforms." },
  { icon: "ShoppingCart", title: "E-Commerce", body: "Storefronts and campaigns built to convert browsers into repeat buyers." },
  { icon: "Building2", title: "Real Estate", body: "Listings, lead funnels, and brand systems for property developers." },
  { icon: "GraduationCap", title: "Education", body: "Learning platforms and content that schools and edtechs actually use." },
  { icon: "Plane", title: "Tourism & Hospitality", body: "Destination storytelling that puts Nepal on every itinerary." },
  { icon: "Newspaper", title: "Media & Publishing", body: "Content engines and products for modern newsrooms and creators." },
] as const;

export const PROCESS = {
  title: "Our 4-step process",
  steps: [
    { icon: "Search", title: "Discover", body: "We dig into your goals, market, and users before a single pixel." },
    { icon: "PenTool", title: "Design", body: "Strategy becomes structure: wireframes, brand, and messaging." },
    { icon: "Code2", title: "Develop", body: "We build, test, and iterate in agile sprints." },
    { icon: "Rocket", title: "Deliver", body: "Launch, measure, and keep improving after release." },
  ],
} as const;

export const TESTIMONIALS = [
  { quote: "Digital Chautari turned our scattered ideas into a brand system and a website that finally converts.", name: "Aarya Shrestha", role: "Founder, Himalaya Organics" },
  { quote: "Their content studio doubled our engagement in three months without us lifting a finger.", name: "Bibek Thapa", role: "Marketing Head, Everest Eats" },
  { quote: "Physio@Home is the rare health-tech product that feels effortless for both patients and therapists.", name: "Dr. Sunita Maharjan", role: "Physiotherapist" },
] as const;

export const POSTS = [
  { slug: "local-first-content", title: "Why Nepali brands win with local-first content", category: "Content", date: "2026-03-12", readTime: "5 min read", excerpt: "Global playbooks break on local nuance. Here's how we build content calendars that actually fit how Nepal searches, shares, and buys." },
  { slug: "seo-in-2026", title: "SEO in 2026: what actually moves rankings now", category: "Marketing", date: "2026-02-28", readTime: "7 min read", excerpt: "AI overviews, zero-click results, and E-E-A-T: the tactics that survived the last two years of search upheaval — and the ones to drop." },
  { slug: "building-physiohome", title: "Building Physio@Home: lessons from health-tech in Nepal", category: "Engineering", date: "2026-02-10", readTime: "6 min read", excerpt: "From house-visit scheduling to therapist vetting: what we learned shipping a healthcare product outside the valley." },
] as const;
```
Icon names are lucide-react exports; resolve via a typed map in `lib/utils.ts` (`export const ICONS = { Package, Users, Target, TrendingUp, ... } as const;` imported once). Add CONTENT-TODO entries: testimonial people/quotes, post dates/titles.

## S1.18 — Home sections 1–5
Grid pattern defaults (use everywhere unless a section says otherwise): `grid gap-5` (gap-5=20px ✓ spec) · 4-col → `grid-cols-1 nav:grid-cols-2 lg:grid-cols-4` · 3-col → `grid-cols-1 nav:grid-cols-2 lg:grid-cols-3` · 6-item grids → `grid-cols-2 lg:grid-cols-3` · 2-col → `grid-cols-1 nav:grid-cols-2`. Wrap every card grid in `<StaggerGroup>`, cards carry `data-reveal`.
1. `HomeHero` in `app/page.tsx`: `<Hero eyebrow title gradient lede>` + buttons (primary `Explore Services →`, ghost `View Products`) + `<StatBar>` (3 segments from HERO.stats) inside hero bottom.
2. `FeatureStrip`: Section standard + `<SectionHeading eyebrow="What sets us apart" title=…>` (SectionHeading = `components/ui/SectionHeading.tsx`: Eyebrow + `<h2 className="font-heading text-h2 nav:text-h2-lg font-bold">` + optional lede; dark prop) — title: "Built different, on purpose". 4 Cards (FEATURES), chips tone by index.
3. `WhoWeAre`: two-column `grid-cols-1 nav:grid-cols-2 gap-10 items-center`; left: eyebrow "Who we are", H2 WHO_WE_ARE.title, two `<p className="text-lede nav:text-lede-lg text-text-muted">`, checklist as 2×2 `grid grid-cols-2 gap-3` items `flex items-center gap-2` with lucide `CheckCircle2 text-action`, Button ghost `Meet the Team →`; right: `grid grid-cols-2 gap-5` mini-cards (teasers: chip + h3, link whole card).
4. `DarkStatsBanner`: `<Section dark>` + SectionHeading dark (eyebrow "Proof in numbers", title "Results we stand behind") + 4-up grid on navy: each `flex items-center gap-3` gold-chip icon + `<p className="font-heading text-2xl font-extrabold text-text-primary">` value + label `text-small-lg text-text-muted`.
5. `ProductsTeaser`: eyebrow "Our products", 3 Cards: chip, `<p className="text-eyebrow uppercase tracking-[0.02em] text-action font-semibold">` category, h3 name, body, link `Learn more →` (`text-action font-semibold hover:underline`).

## S1.19 — Home sections 6–10
6. `SectorsGrid`: eyebrow "Sectors", title "Sectors we serve", 6 Cards (SECTORS) in `grid-cols-2 lg:grid-cols-3`.
7. `ProcessSteps`: `<Section dark>`, SectionHeading dark (eyebrow "How we work", title PROCESS.title); 4 numbered cards on navy: `<span className="font-heading text-3xl font-extrabold text-accent-gold">0{i+1}</span>` + chip + h3 + body; `grid-cols-1 nav:grid-cols-2 lg:grid-cols-4`.
8. `Testimonials`: eyebrow "Kind words", title "What clients say"; 3 Cards each: 5 lucide `Star` icons `fill-accent-gold text-accent-gold` + `<span className="sr-only">Rated 5 out of 5</span>`, quote `text-lede`, footer name (semibold) + role `text-small text-text-muted`.
9. `BlogTeaser`: eyebrow "Blog", title "Latest from our blog"; 3 Cards: placeholder image block `aspect-[16/9] rounded-lg` → NO arbitrary: add `--ratio-blog: 16/9` token + utility `@utility ratio-blog { aspect-ratio: var(--ratio-blog); }`, bg rotates chip palette (`bg-chip-1…`) with `aria-hidden` + a big translucent lucide icon centered; category `Badge`; `text-small text-text-muted` = `March 12, 2026 · 5 min read` (format date like that); h3 title; excerpt; `Read more →` link to `/blog`.
10. `ClosingCta` (variant gradient — Home only): rounded panel `@utility cta-gradient { background: linear-gradient(135deg, var(--color-dc-teal-500), #2563eb); }` (put literal `#2563eb` here in globals — allowed location), `rounded-card px-6 py-12 text-center text-white`, H2 "Ready to build something extraordinary together?", buttons: primary-on-gradient = white bg teal text (`bg-white text-action-hover hover:bg-white/90`) `Start a Project →` → `/contact`, ghostDark-inverted `border-white/40 text-white hover:bg-white/10` `View Services` → `/services`.

## S1.20 — Sprint verification + review request
Run and fix until true: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` · keyboard-tab whole page · reduced-motion emulation (DevTools → Rendering → emulate) shows all content · `grep -rnE '#[0-9A-Fa-f]{6}' app components | grep -v globals.css` empty.
Write `docs/execution/REVIEW-REQUEST-S1.md`: what to review (styleguide, Home at 4 widths, motion), current `⟨TBC⟩` list from CONTENT-TODO. Update PROGRESS.md (CURRENT SPRINT: 2). Commit: `feat(home): complete home page sections 1-10 (S1.18-S1.19)`.
