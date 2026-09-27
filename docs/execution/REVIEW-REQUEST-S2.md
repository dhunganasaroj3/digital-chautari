# REVIEW REQUEST — Sprint 2 (Inner Pages: Services · Products · About)

**Status:** All S2.1–S2.15 tasks complete. All gates green: `pnpm lint` · `pnpm typecheck` · `pnpm test` (15/15 unit) · `pnpm exec playwright test` (3 passed, 1 fixme for S3 /contact) · `pnpm build` (4 routes prerendered) · hex audit clean.

## How to look at it

```bash
cd ~/projects/digital-chautari
pnpm dev        # then open http://localhost:3000/services · /products · /about
```

## Screenshots (saved in this folder)

| File | What it shows |
|---|---|
| `shot-s2-services-rows-1440.png` | Alternating category rows: text left / subs right, then flipped; 2×2 sub-service mini-cards |
| `shot-s2-services-pricing-1440.png` | Pricing: navy Professional tier with gold "Most Popular" badge, white Starter/Enterprise |
| `shot-s2-products-tabs-1440.png` | Pill tabs (active = teal `#0D7F76`), gradient hero, browser-chart mockup, stats row |
| `shot-s2-about-roadmap-1440.png` | Alternating roadmap timeline — green dots centered on the line, gold year pills |
| `shot-s2-about-roadmap-375.png` | Roadmap <760px: single column, line + dots on the left, cards right |

## What to review

1. **Services** (`/services`) — 3 category rows with anchor ids (`#digital-marketing`, `#content-creation`, `#software-development` — these power the footer links), pricing (exact strings "Rs 15,000" / "Rs 45,000" / "Custom"), industries grid, dark why-us band, dark closing CTA.
2. **Products** (`/products`) — Radix Tabs: click, ArrowLeft/Right/Home/End (automatic activation), `?product=physio` deep link + refresh, invalid param falls back to tab 1. Three decorative CSS mockups (browser chart / content feed / phone booking app). Physio@Home Spotlight band.
3. **About** (`/about`) — story + 2×2 fact tiles (teal/navy/gold/white), mission & vision, values, dark quality band, 7-person team grid with initials avatars, roadmap timeline, dark closing CTA.
4. **Consistency** — same hero, header, footer, section rhythm (64/48) and card language as the home page; all copy verbatim from the sprint brief.

## Open ⟨TBC⟩ items (CONTENT-TODO.md)

- The three product `cta.href` URLs (currently `"#"`, open in new tabs)
- Team member names (brief's initials-style placeholders)
- Carried from Sprint 1: header tagline, footer legal name, testimonial people/quotes, blog dates/titles

## Implementation notes for the reviewer

- **Verified live, not just built:** tab keyboard navigation, deep links, active-pill color (`rgb(13,127,118)` = the A-1 action token) checked in the in-app browser; overflow sweep at 375/760/1024/1440 × 3 pages found zero horizontal scroll.
- **Two bugs found by the sweep, fixed:** (1) dark pricing card text was invisible — `data-scheme="dark"` remaps tokens but nothing re-declared text `color`, so the card inherited body ink; Card's `dark` prop now sets `text-text-primary`. (2) Roadmap `odd:`/`even:` variants were shifted by the decorative line span (child 1 of the `<ol>`) and never matched the dot spans (each is its own `<li>`'s first child); replaced with index-conditional classes.
- **`/contact` is Sprint 3** — the nav e2e test marks it `test.fixme` with a TODO so the suite stays green until then.
- Playwright chromium installed without `--with-deps` (no sudo in this environment); system libraries were already sufficient.
- pnpm repair note: an interrupted `pnpm add` can leave zero-byte files inside `node_modules/.pnpm` extractions — `rm` the package dirs + `pnpm install --force` rebuilds them (also fixed create-next-app's leftover `allowBuilds` placeholder in `pnpm-workspace.yaml`).
