# REVIEW REQUEST — Sprint 1 (Foundation & Home)

**Status:** All S1.0–S1.20 tasks complete. All gates green: `pnpm lint` · `pnpm typecheck` · `pnpm test` (10/10) · `pnpm build` · hex audit clean (no colors outside `globals.css`).

## How to look at it

```bash
cd ~/projects/digital-chautari
pnpm dev        # then open http://localhost:3000
```

## Screenshots (saved in this folder)

| File | What it shows |
|---|---|
| `shot-s1-styleguide.png` | `/dev` styleguide: 18 primitive swatches, semantic light + dark remap, full type scale, every UI primitive, StaggerGroup demo, hero-bg |
| `shot-s1-home-1440.png` | Home hero at 1440px — eyebrow, gradient H1, lede, CTAs, 3-segment stat bar |
| `shot-s1-home-375.png` | Home at 375px — hamburger header, stacked hero, stacked stat bar |
| `shot-s1-home-375-menu.png` | Mobile nav open (scroll-locked, first link focused) |

## What to review

1. **Token system** — `/dev` page section 1–2: are the palette/swatch mappings faithful to the PDF? Dark strip shows the `data-scheme="dark"` remap (navy surfaces, muted slate text).
2. **Type scale** — `/dev` section 3: pinned values (H1 32→46, H2 28→30, H3 16→17, body 15→17, small 12→13, button 14→15, eyebrow 11→13) inside the spec ranges.
3. **Home page at 1440 / 760 / 375** — section order and copy are verbatim from the approved plan; gradient falls on "digital bridges" (gold stop uses the A-2 `#B9821B` on light backgrounds per the contrast decision).
4. **Motion** — scroll the home page: 0.45s fade/rise, 70ms stagger, trigger at 88% viewport; card chips scale 1.08× on card hover. Reduced-motion users get static content (GSAP is gated on `prefers-reduced-motion: no-preference` + a global CSS kill-switch; Playwright emulation test comes in Sprint 4).
5. **Chrome** — sticky white/blur header with active-link state; mobile menu focus trap (Esc returns focus to the hamburger — verified); 4-column footer on navy with gold headings.
6. **Styleguide motion demo** — `/dev` section 5: 6 cards stagger on scroll; navigate away/back leaves no ghost animations (`matchMedia.revert()` cleanup).

## Open ⟨TBC⟩ items (CONTENT-TODO.md)

- Header tagline (currently "Creative Technology Company")
- Footer copyright company legal name
- Testimonial people/quotes (placeholder clients)
- Blog post dates/titles (drafts, not yet published)

## Implementation notes for the reviewer

- Styleguide lives at **`/dev`** (not `/_dev` — underscore folders are private/unroutable in Next.js); `noindex` metadata set, robots/sitemap exclusion happens in S3.
- Hero text column is a `text-col` utility with literal max-widths — a `--text-col` @theme token would have collided with Tailwind's font-size namespace (found + fixed during S1.20 verification).
- Home page is ~10.7k px tall; the in-app browser's full-page capture stitches duplicates, so screenshots are viewport-sized (the styleguide shot zooms out to fit the whole page).
