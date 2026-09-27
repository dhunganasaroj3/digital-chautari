# R-CHECKLIST (tick = visually verified)

Verified 2026-09-28 against the production build (`pnpm build` + `pnpm start`, port ownership
confirmed via `ss -tlnp`) at 375 AND 1024 px, per S4.1. Method: Playwright probe over the live
DOM (computed styles for tokens/type/layout, text assertions for route copy) + full-page
screenshots of all 9 routes at both widths (`docs/execution/shots-s4/`), reviewed visually.
Fixes found during the walk are committed as S4.1-fix-1…4 (see PROGRESS.md decisions).

## Tokens
- [x] R-002 teal #0F9488 on buttons/links/active nav/icon accents
      (buttons carry A-1 #0D7F76 per the sanctioned contrast decision; #0F9488 remains on icon
      accents, focus ring, gradient start — computed rgb(13,127,118) on action surfaces)
- [x] R-003 #0B6F66 hovers + dark-section accent text (hover probe: rgb(11,111,102))
- [x] R-004 gold #E0A930 headline highlights, Most Popular badge, dark eyebrows
      (fixed in S4.1-fix-2 — dark eyebrows were muted #A7B4C7, now rgb(224,169,48))
- [x] R-005 leaf #7FAE3A gradient end stop (rgb(127,174,58) in computed gradient)
- [x] R-006 ink #101826 body/headings (rgb(16,24,38))
- [x] R-007 navy #0B1220 stats banners/footer/process/dark CTAs (rgb(11,18,32))
- [x] R-008 navy-card #101D2B cards on navy (rgb(16,29,43))
- [x] R-009 navy-border #223140 dark card borders (rgb(34,49,64))
- [x] R-010 paper #FBFBF9 page bg (rgb(251,251,249))
- [x] R-011 line #E7E5DF card/input borders (rgb(231,229,223))
- [x] R-012 muted #5B6472 body copy/captions (rgb(91,100,114))
- [x] R-013 H1 gradient 90deg teal→gold→leaf clipped to text (A-2 gold on light:
      linear-gradient(90deg, rgb(15,148,136), rgb(185,130,27), rgb(127,174,58)), bg-clip-text)
- [x] R-014 chips rotate mint/teal/gold/lilac/pink — no other hues (computed chip bgs rotate)
## Type
- [x] R-015 Sora 600/700/800 headings (computed font-family Sora; h1 800, h2/h3 700)
- [x] R-016 Inter 400/500/600 body (computed font-family Inter)
- [x] R-017 base 16px ink lh-1.5 (16px / 24px / rgb(16,24,38))
- [x] R-018 H1 46/32px 800 (46px @1024, 32px @375, weight 800)
- [x] R-019 H2 28–30px 700 (30px @1024 / 28px @375)
- [x] R-020 H3 16–17px 600–700 (17px / 700)
- [x] R-021 body/lede 15–17px 400 (17px @1024 / 15px @375, weight 400)
- [x] R-022 small 12–13px 500 (fixed in S4.1-fix-4 — was 400; now 500 via text tokens)
- [x] R-023 button 14–15px 600 (15px @1024 / 14px @375, weight 600)
- [x] R-024 eyebrow 11–13px 600 uppercase ls 0.02em (13px/600/uppercase/0.26px @1024)
## Layout
- [x] R-025 1120px container; 40/22px gutters; 760px switch (computed; nav/burger flip at 375/1024)
- [x] R-026 64/48/84+48 section rhythm (standard 64/64, tight 48/48, hero 84/48 computed)
- [x] R-027 20px grid gaps, 2/3/4 col grids (computed gap 20px; col variants across pages)
- [x] R-028 radii 10/12/16/8 (chip 10, card 12, pill 16, btn 8 computed)
- [x] R-029 card rest 1px line border; hover -4px + shadow token (fixed S4.1-fix-3; hover
      translate 0px -4px + shadow-card-hover computed)
- [x] R-030 primary btn solid action teal white 13/24 8px; ghost white 1px border (computed)
## Global components
- [x] R-031 sticky white/blur header, DC gradient mark + wordmark + tagline
- [x] R-032 center nav 5 items + right Contact Us (5 nav <a> computed + screenshot)
- [x] R-033 hamburger <760 (burger display block @375, none @1024)
- [x] R-034 hero pattern every page (mint→paper, glow TR, eyebrow pill, gradient H1, lede,
      ≤720px text) — verified on /, /services, /products, /about, /contact screenshots
- [x] R-035 stat bar bordered card, equal segments, dividers, chip+number+label (home)
- [x] R-036 dark banners: navy, gold eyebrow, white H2 (fixed in S4.1-fix-2)
- [x] R-037 cards: white 1px 12px 22px, chip TL, h3, muted body
- [x] R-038 footer navy 4-col + divider + centered © (rgb(11,18,32), 48px rhythm)
## Motion
- [x] R-039 page fade+slide 0.45s (computed animation page-enter 0.45s)
- [x] R-040 scroll reveals, 70ms stagger (REVEAL.stagger 0.07s; probe: 40/40 reveals fire)
- [x] R-041 hover lift −4→−5px + shadow; chip 1.08× (fixed S4.1-fix-3; computed translate
      0px -4px + shadow on hover; chip-scale 1.08 in no-preference media block)
- [x] R-042 reduced-motion kills all of it, content visible (probe: 40/40 visible,
      page-enter duration 1e-05s; dedicated e2e in S4.4)
## Home
- [x] R-043 eyebrow "🚀 Welcome to Digital Chautari"
- [x] R-044 H1 w/ gradient "digital bridges" + lede + 2 buttons
- [x] R-045 stat bar 3/7+/100%
- [x] R-046 features 4 exact titles
- [x] R-047 who-we-are H2 + 2 paras + 2×2 checklist + Meet the Team →
- [x] R-048 right 2×2 teasers incl. Branding & Design
- [x] R-049 dark stats 250+/40+/1M+/98%
- [x] R-050 products teaser 3 cards icon+category+desc+Learn more
- [x] R-051 sectors 6
- [x] R-052 dark numbered 4-step process
- [x] R-053 testimonials 3 × 5-star + name + title/company
- [x] R-054 blog teaser 3 w/ colored block, tag, date/read-time, excerpt
- [x] R-055 gradient CTA panel + both buttons
## Services
- [x] R-056 hero "Services that drive growth" (gradient "drive growth")
- [x] R-057 3 rows icon+title+desc | 2×2 subs
- [x] R-058 DM subs exact four
- [x] R-059 pricing 3 tiers, Professional dark + Most Popular, checklists + CTAs
- [x] R-060 industries 6
- [x] R-061 dark why-us 6 exact items
- [x] R-062 dark CTA + "Book a Consultation →"
## Products
- [x] R-063 hero "Three ventures, one vision" (gradient "one vision")
- [x] R-064 pill tabs; panel category/title/desc/stats/CTA
- [x] R-065 mock preview right
- [x] R-066 spotlight "Physio@Home — healthcare reimagined"
## About
- [x] R-067 hero (gradient "people behind")
- [x] R-068 story H2 + narrative
- [x] R-069 tiles 2025/3/Kathmandu/7+ alternating teal/navy/white/gold
- [x] R-070 mission & vision side-by-side
- [x] R-071 values 4 exact
- [x] R-072 dark quality 4 exact
- [x] R-073 team 7 exact roles
- [x] R-074 roadmap: alternating, center line, green dots, gold year pills, 4 milestones
- [x] R-075 dark CTA "Want to join our journey?" + "Get in Touch →"
## Contact
- [x] R-076 hero (gradient "conversation")
- [x] R-077 info cards Address/Email/Phone/Hours
- [x] R-078 "Reach the right team" 4 depts w/ emails
- [x] R-079 form fields + Project-Type pills + Send
- [x] R-080 map placeholder card
- [x] R-081 dark FAQ callout
- [x] R-082 response times 24h / 2–3 days / same day
