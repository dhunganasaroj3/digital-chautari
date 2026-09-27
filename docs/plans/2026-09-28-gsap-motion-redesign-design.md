# GSAP Motion Redesign + Animation Review System — Design

Date: 2026-09-28 · Status: Approved (user signed off on approach, scope, review-loop rules)

## Problem

The site's entire motion vocabulary is one pattern: `staggerReveal()` fades/rises
`[data-reveal]` items (0.45s, power2.out, 70ms stagger). No hero entrance, no
scroll-scrubbed depth, no text choreography, no micro-interactions. The user
finds it rigid and minimalistic and asked for research-driven, more fluid
animation — plus an automated review system that loops until it scores ≥ 8/10.

## Research basis (award-site patterns)

Patterns distilled from GSAP showcase / Site-of-the-Week winners and 2025
tutorials (Codrops, frontend.horse, GSAP forums):

1. Smooth inertia scrolling (ScrollSmoother, or Lenis) — the single biggest
   perceived-fluidity upgrade; always paired with scroll-triggered reveals.
2. SplitText headline reveals — line/word/char masking, yPercent + clip-path,
   staggered from "start".
3. Scrubbed parallax — backgrounds/decor moving at different speeds via
   `data-speed` or manual `scrub: true` tweens; transform/opacity only.
4. Velocity-reactive infinite marquees (scroll velocity modulates speed).
5. Magnetic buttons via `gsap.quickTo` + inner-label lag.
6. Orchestrated hero entrance timelines (eyebrow → title → lede → CTAs → stats
   with counting numbers).
7. CustomEase signature curves; longer durations (0.7–1.0s) with overlapping
   staggers — replaces flat uniform power2.out fades.
8. Pinning/scrub storytelling (NOT in scope — user chose "Premium & layered",
   not "Bold awwwards").

GSAP 3.15 ships all former Club plugins free (SplitText, ScrollSmoother, Flip,
DrawSVG, CustomEase…) — already installed, no new deps.

## Decisions (user-confirmed)

- Intensity: **Premium & layered** (fluid, cinematic; no scroll hijacking beyond
  inertia smooth scroll).
- Smooth scroll: **yes**, ScrollSmoother for `pointer: fine` +
  `no-preference` motion only; native scroll for touch/reduced-motion.
- Scope: **whole site via shared primitives** (home polished first, then all
  marketing pages reuse the same primitives).
- Review loop: **cap 4 rounds**, report best if never ≥ 8; hard-gate failures
  (reduced motion, console errors, CLS) cap score at 7.

## Architecture — Approach A: motion primitives library

### Core (`lib/gsap/`)

- `plugins.ts` — one-time registration: ScrollTrigger, ScrollSmoother,
  SplitText, Flip, CustomEase (+ Observer if needed).
- `eases.ts` — canonical motion tokens: signature CustomEase curves, duration
  scale (0.7–1.0s reveals), stagger scale, `REVEAL` v2 constants. Unit-tested.
- `reveals.ts` — v2 of the existing batch reveal using the new tokens; keeps
  `data-reveal` contract and reduced-motion guarantee (nothing hidden without
  preference for motion).

### Primitives (`components/motion/`)

| Primitive | Effect |
| --- | --- |
| `SmoothScroll` | client provider in root layout; ScrollSmoother wrapper/content divs; fixed header stays outside content; anchors still work |
| `HeroIntro` | orchestrated load timeline; SplitText line-masked title, staggered eyebrow/lede/CTAs, Counter stats |
| `SplitReveal` | SplitText heading reveal (lines/words + clip mask) for section headings |
| `Parallax` | wrapper giving children scrubbed depth (decorative glows, mockups) |
| `Marquee` | infinite velocity-reactive loop (replaces FeatureStrip static row) |
| `MagneticButton` | quickTo magnetic hover + label lag, wraps existing `Button` |
| `Counter` | count-up numbers on enter (StatBar integration) |
| `Reveal` / `StaggerGroup` | same public API, richer curve + optional blur/scale variants |

### Application order

Home (Hero → FeatureStrip marquee → DarkStatsBanner parallax+counters →
ProcessSteps scrub → Testimonials depth → ClosingCta), then about/services/
products/contact/blog via their existing sections and `SectionHeading`.

## Animation review system

- `scripts/review-animations.mjs` (Node, Playwright chromium):
  - scripted scroll pass per key page; mid-animation screenshots; scroll video;
  - hard metrics: reduced-motion visibility, console errors, CLS,
    animated-element + ScrollTrigger counts, long tasks during scroll;
  - writes `review/animations/report-rN.json` + artifacts.
- Rubric (0–10 per page, weighted): fluidity, richness/layering,
  choreography, consistency, craft details → overall score.
- Scoring: harness collects metrics + captures; agent scores rubric from the
  rendered captures; both recorded in the report.
- Loop rule: improve → review → repeat until overall ≥ 8/10, max 4 rounds;
  best round kept if never ≥ 8; blocking issues reported.

## Safety rails

- transform/opacity-only animations (no layout properties).
- Every effect behind `gsap.matchMedia()`; reduced-motion users get static,
  fully-visible content (existing e2e `reduced-motion.spec.ts` keeps passing).
- `useGSAP` scoped cleanup on unmount; no global leakage between routes.
- Existing e2e suite, typecheck, lint, build, and Lighthouse budgets stay green
  (ScrollSmoother/SplitText add ~50KB JS — watch the perf budget).
- Read `node_modules/next/dist/docs/` before writing client-component code
  (AGENTS.md: Next 16 differs from training data).

## Sources

- GSAP ScrollSmoother docs — https://gsap.com/docs/v3/Plugins/ScrollSmoother
- Codrops layered zoom with ScrollSmoother+ScrollTrigger (Oct 2025) —
  https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger
- GSAP ScrollTrigger performance best-practices thread — https://gsap.com
- Olivier Larose, magnetic buttons with React + GSAP — https://blog.olivierlarose.com
- GSAP showcase / Site of the Week picks (@greensock) — https://x.com/greensock/all
