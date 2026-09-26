# SPRINT 2 — Inner Pages: Services · Products · About

**Prereq:** SPRINT-1 complete (tokens, primitives, chrome, GSAP pattern, data conventions).
**Conventions from S1 that still apply:** tokens only in globals.css · copy verbatim from this file · `data-reveal` + `StaggerGroup` for grids · icons via the `ICONS` map + `lucide-react` · grid classes `grid gap-5` with the column patterns from S1.18.

---

## S2.1 — Services data (`lib/data/services.ts`)
```ts
export const SERVICES_HERO = {
  eyebrow: "Our Services",
  title: "Services that drive growth",
  gradient: "drive growth",
  lede: "Three practices, one team — strategy, creativity, and engineering priced transparently and delivered in agile sprints.",
} as const;

export const CATEGORIES = [
  { id: "digital-marketing", icon: "Megaphone", title: "Digital Marketing",
    body: "Data-driven campaigns that put your brand in front of the right people and turn attention into revenue.",
    subs: [ { icon: "Search", title: "SEO & SEM" }, { icon: "Share2", title: "Social Media Marketing" }, { icon: "Megaphone", title: "Paid Advertising" }, { icon: "BarChart3", title: "Analytics & Reporting" } ] },
  { id: "content-creation", icon: "Clapperboard", title: "Content Creation",
    body: "Stories that stick — planned, produced, and measured by one studio team.",
    subs: [ { icon: "Video", title: "Video Production" }, { icon: "PenLine", title: "Copywriting & Blogs" }, { icon: "Palette", title: "Graphic Design" }, { icon: "Lightbulb", title: "Content Strategy" } ] },
  { id: "software-development", icon: "Code2", title: "Software Development",
    body: "Full-stack products from concept to launch and beyond.",
    subs: [ { icon: "Globe", title: "Web App Development" }, { icon: "Smartphone", title: "Mobile App Development" }, { icon: "PenTool", title: "UI/UX Design" }, { icon: "Wrench", title: "Maintenance & Support" } ] },
] as const;

export const PRICING = {
  eyebrow: "Pricing", title: "Simple, transparent pricing",
  tiers: [
    { name: "Starter", price: "Rs 15,000", period: "/mo", dark: false,
      features: ["1 campaign channel", "4 posts/mo content calendar", "Basic analytics report", "Email support"],
      cta: { label: "Choose Starter →", href: "/contact" } },
    { name: "Professional", price: "Rs 45,000", period: "/mo", dark: true, badge: "Most Popular",
      features: ["Up to 3 campaign channels", "12 content assets/mo", "SEO + monthly reporting", "Dedicated manager", "Priority support"],
      cta: { label: "Choose Professional →", href: "/contact" } },
    { name: "Enterprise", price: "Custom", period: "", dark: false,
      features: ["Custom strategy & roadmap", "Full-scale production team", "Custom software development", "SLA & 24/7 support"],
      cta: { label: "Talk to Sales →", href: "/contact" } },
  ],
} as const;

export const INDUSTRIES = {
  eyebrow: "Industries", title: "Who we work with",
  items: [
    { icon: "Stethoscope", title: "Healthcare" }, { icon: "ShoppingCart", title: "E-Commerce" },
    { icon: "Building2", title: "Real Estate" }, { icon: "GraduationCap", title: "Education" },
    { icon: "Plane", title: "Tourism" }, { icon: "Newspaper", title: "Media" },
  ],
} as const;

export const WHY_US = {
  eyebrow: "Why us", title: "Why work with us",
  items: ["Dedicated project manager", "Agile development cycle", "Transparent pricing", "Post-launch support", "Scalable architecture", "Cross-platform expertise"],
} as const;
```

## S2.2 — Services page rows (`app/services/page.tsx` + `components/sections/ServiceCategoryRow.tsx`)
Page = `<Hero eyebrow title gradient lede>` then for each CATEGORY a row `<section id={c.id} className="scroll-mt-20">` (ids power footer links): `grid grid-cols-1 nav:grid-cols-2 gap-10 items-center` — left: IconChip + h2 + body + `Discuss this service →` link to `/contact`; right: `grid grid-cols-2 gap-5` mini-cards for subs (chip + h3). Alternate left/right on even rows (`nav:[&>*:first-child]:order-2` or conditional class). Wrap subs grid in StaggerGroup.
DONE WHEN: 3 rows, ids present, subs exactly 4 each.

## S2.3 — Pricing (`components/sections/PricingTable.tsx`)
`<section id="pricing" className="scroll-mt-20">` + SectionHeading; `grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch`. Tier card = `Card` + `flex h-full flex-col`; dark tier: `data-scheme="dark"` on the card itself (tokens remap) + `<Badge>` gold pill "Most Popular" absolutely positioned top-center (`-top-3 left-1/2 -translate-x-1/2`). Price: `<p className="font-heading text-3xl font-extrabold">{price}</p> <span className="text-text-muted">{period}</span>`. Features: `CheckCircle2 text-action` list `flex flex-col gap-3`. CTA Button at bottom `mt-auto`.
DONE WHEN: Professional visually navy w/ gold badge; others white; prices exact strings.

## S2.4 — Industries + Why-us + CTA
`IndustriesGrid`: 6 simple cards (chip + label only) `grid-cols-2 lg:grid-cols-3`.
`WhyWorkWithUs`: `<Section dark>` + SectionHeading dark + `grid grid-cols-1 nav:grid-cols-2 gap-4`; items `flex items-center gap-3` + `CheckCircle2` gold (`text-accent-gold`) + `text-lede`.
`ClosingCta variant="dark"`: navy section, gold eyebrow "Next step", white H2 "Let's find the right service for you", buttons: primary `Book a Consultation →` → `/contact` + ghostDark `View Pricing` → `/services#pricing`.

## S2.5 — Products data (`lib/data/products.ts`)
```ts
export const PRODUCTS_HERO = { eyebrow: "Our Products", title: "Three ventures, one vision", gradient: "one vision",
  lede: "We build our own products so the work we do for you is practiced, not theoretical." } as const;
export const PRODUCTS = [
  { id: "eco", tab: "Eco Creative Marketing Agency", category: "Marketing Agency", icon: "Sprout",
    name: "Eco Creative Marketing Agency",
    body: "Performance-first digital marketing for purpose-led brands: SEO, social, and campaigns that compound.",
    stats: [ { value: "40+", label: "Clients" }, { value: "250+", label: "Campaigns" }, { value: "12", label: "Industries" } ],
    cta: { label: "Visit Eco Creative →", href: "#" }, external: true },
  { id: "one", tab: "One Content Creation Studio", category: "Content Studio", icon: "Video",
    name: "One Content Creation Studio",
    body: "A studio for scroll-stopping content — strategy, video, design, and copy produced under one roof.",
    stats: [ { value: "1M+", label: "Views" }, { value: "120+", label: "Videos" }, { value: "8", label: "Brands" } ],
    cta: { label: "Explore One Studio →", href: "#" }, external: true },
  { id: "physio", tab: "Physio@Home", category: "Health-Tech Platform", icon: "HeartPulse",
    name: "Physio@Home",
    body: "Physiotherapy that comes to you: book certified physiotherapists for at-home sessions across Nepal.",
    stats: [ { value: "500+", label: "Sessions" }, { value: "30+", label: "Therapists" }, { value: "4.9★", label: "Rating" } ],
    cta: { label: "Learn more about Physio@Home →", href: "#" }, external: true },
] as const;
export const PHYSIO_SPOTLIGHT = { eyebrow: "Spotlight", title: "Physio@Home — healthcare reimagined",
  body: "Certified physiotherapy delivered at home — booking, scheduling, and progress tracking in one app.",
  cta: { label: "Get in Touch →", href: "/contact" } } as const;
```
Add CONTENT-TODO: the three external `href: "#"` URLs.

## S2.6 — Products hero + tabs (`app/products/page.tsx`, `components/sections/TabbedProducts.tsx`)
`pnpm add @radix-ui/react-tabs`. Radix `Tabs` with `activationMode="automatic"`; tab list = pill tabs: `rounded-pill border border-border-default bg-surface-card p-1 flex flex-wrap gap-1`; trigger `rounded-pill px-4 py-2 text-small-lg font-semibold data-[state=active]:bg-action data-[state=active]:text-on-action`. Read initial tab from `useSearchParams().get("product")` (validate against ids; wrap page part needing it in `<Suspense>`). Panel `grid grid-cols-1 nav:grid-cols-2 gap-10 items-center`: left = category (action-colored eyebrow style) + h2 name + body + stats row (`flex gap-8`, value `font-heading text-2xl font-extrabold`, label small muted) + CTA Button (external → `target="_blank" rel="noreferrer"` — Button needs optional `external` prop; add it). Content = server-renderable per tab (Radix Tabs are client — acceptable island).
DONE WHEN: ArrowLeft/Right/Home/End move focus; active pill teal; `?product=physio` opens third tab; deep-link refresh works.

## S2.7 — Mock previews (`components/sections/ProductMockup.tsx`)
One component, `variant: "browser" | "feed" | "phone"`, pure CSS, `aria-hidden="true"`, inside `rounded-card border border-border-default bg-surface-card p-4`:
- browser: window chrome (three dots via `size-3 rounded-full bg-chip-*`), body with fake sidebar bar + 3 bars chart (divs with heights `h-16/h-24/h-20` `bg-action/20` last `bg-action`).
- feed: 2×3 grid of rounded blocks rotating chip palette + one play-triangle overlay (lucide `Play`).
- phone: centered `w-[220px]]`→ NO arbitrary width — use `w-56` (224px ok) rounded-2xl border, notch bar, 3 list rows (avatar block + two lines), bottom Button-ish block `bg-action`.
Timebox: if not done in 2h, simplify visuals (keep the three silhouettes). It is decorative.

## S2.8 — Spotlight
`<Section dark>` + SectionHeading dark + body + primary CTA. Full-width navy, Physio@Home name exact casing.

## S2.9 — About data (`lib/data/about.ts`)
```ts
export const ABOUT_HERO = { eyebrow: "About Us", title: "The people behind Digital Chautari", gradient: "people behind",
  lede: "A chautari built by marketers, creators, and engineers — headquartered in Kathmandu, shipping everywhere." } as const;
export const STORY = {
  eyebrow: "Our story", title: "From a chautari to a digital powerhouse",
  paragraphs: [
    "Every chautari starts the same way: a tree, a platform, and people who gather. Ours started in 2025 with three founders, a shared desk in Kathmandu, and a conviction that Nepali ideas deserve world-class execution.",
    "Today Digital Chautari runs three ventures and a client services studio — marketers, creators, and engineers who practice on their own products before recommending anything to yours.",
  ],
  tiles: [
    { icon: "Calendar", value: "2025", label: "Founded", tone: "teal" },
    { icon: "Layers", value: "3", label: "Products", tone: "navy" },
    { icon: "MapPin", value: "Kathmandu", label: "Headquarters", tone: "gold" },
    { icon: "Users", value: "7+", label: "Team Members", tone: "white" },
  ],
} as const;
export const MISSION_VISION = {
  mission: { icon: "Target", title: "Our Mission", body: "To make world-class digital expertise accessible to Nepali businesses — and take Nepali products to the world." },
  vision: { icon: "Telescope", title: "Our Vision", body: "A chautari in every corner of the digital world: the most trusted creative-technology partner in Nepal." },
} as const;
export const VALUES = [
  { icon: "Flame", title: "Passion", body: "We care about outcomes like they're our own — because three of them are." },
  { icon: "Lightbulb", title: "Creativity", body: "Every brief gets fresh thinking, not a recycled template." },
  { icon: "Award", title: "Excellence", body: "Details compound. We sweat them." },
  { icon: "Users", title: "Collaboration", body: "One team, your team — from kickoff to after launch." },
] as const;
export const QUALITY = {
  eyebrow: "Trust", title: "Committed to quality & trust",
  items: [
    { icon: "BadgeCheck", title: "ISO 9001 Ready", body: "Processes documented and audited to international quality standards." },
    { icon: "ShieldCheck", title: "Data Protection", body: "Privacy-by-default practices in everything we build and run." },
    { icon: "Globe", title: "Global Delivery", body: "Remote-first workflows trusted by clients across time zones." },
    { icon: "Network", title: "Pan-Nepal Network", body: "From Kathmandu to provinces — talent and reach nationwide." },
  ],
} as const;
export const TEAM = [
  { name: "A. Karki", role: "Founder & CEO" },
  { name: "S. Gurung", role: "Co-Founder & COO" },
  { name: "R. Shrestha", role: "Front-End Developer" },
  { name: "N. Adhikari", role: "Back-End Developer" },
  { name: "P. Lama", role: "Marketing Lead" },
  { name: "B. Thapa", role: "Sales Executive" },
  { name: "M. Rai", role: "Business Development Officer" },
] as const;  // names are ⟨TBC⟩ → CONTENT-TODO
export const ROADMAP = {
  eyebrow: "Roadmap", title: "Where we're headed",
  milestones: [
    { year: "2025", title: "The Idea", body: "Three founders sketch a chautari for the digital age over endless cups of chiya." },
    { year: "2025", title: "First Products", body: "Eco Creative and One Content Studio open their doors." },
    { year: "2026", title: "Health-Tech Entry", body: "Physio@Home brings certified physiotherapy home." },
    { year: "2026", title: "Company Registration", body: "Digital Chautari Pvt. Ltd. is formally registered." },
  ],
} as const;
export const ABOUT_CTA = { title: "Want to join our journey?", cta: { label: "Get in Touch →", href: "/contact" } } as const;
```

## S2.10 — About hero + story + tiles + mission/vision
`app/about/page.tsx`: Hero. `StoryBlock`: two-col — left STORY text (eyebrow, h2, paragraphs), right `InfoTiles` 2×2 (`grid grid-cols-2 gap-5`): tile = `rounded-card p-[22px]` (p-card) with tone map → teal: `bg-dc-teal-500 text-white` · navy: `bg-dc-navy-900 text-white` · gold: `bg-accent-gold text-dc-navy-900` · white: `border border-border-default bg-surface-card`; value `font-heading text-2xl font-extrabold`, label small. `MissionVision`: two Cards side by side, each chip + h3 + body.

## S2.11 — Values + quality + team
`ValuesGrid`: 4 Cards (`grid-cols-1 nav:grid-cols-2 lg:grid-cols-4`).
`QualityTrust`: `<Section dark>` + 4 dark Cards.
`TeamGrid`: `<section id="team" className="scroll-mt-20">` + 7 Cards `grid-cols-2 nav:grid-cols-3 lg:grid-cols-4` (last row uneven is fine): avatar = initials circle `size-12 rounded-full bg-chip-N grid place-items-center font-heading font-bold` (tone by index), name semibold, role `text-small text-text-muted`. The "7+" in tiles matches these 7 (D-1 resolved).

## S2.12 — Roadmap timeline (`components/sections/Roadmap.tsx`)
`<Section dark>` + heading. Desktop: `<ol className="relative mx-auto max-w-2xl">` with absolute center line `left-1/2 w-px bg-border-default` (decorative `aria-hidden`, full height); each `<li className="relative nav:w-1/2 nav:odd:pr-10 nav:even:pl-10 nav:odd:text-right`…>— alternate sides via odd/even classes; dot = `absolute top-1 size-3 rounded-full bg-dc-leaf-500` (green dot) positioned at the line (`nav:odd:-right-1.5 nav:even:-left-1.5`); year = `<Badge>` gold pill. Mobile (<760): line at left `left-1.5`, all cards on right, dots at left. Cards: dark Card with h3 + body.
DONE WHEN: 4 milestones, 2025/2025/2026/2026 pills, green dots on centered line ≥760px, clean single column <760px, list semantics (`ol/li`).

## S2.13 — About CTA
`ClosingCta variant="dark"` with ABOUT_CTA (gold eyebrow "Join us").

## S2.14 — Cross-page polish
Breakpoint sweep 375/760/1024/1440 on the three new pages: no horizontal scroll, no clipped text, all grids per column patterns, headers/footers consistent. Fix what you find; log fixes as decisions.

## S2.15 — Tests batch 2
Vitest: data integrity — CATEGORIES length 3 & each subs length 4; PRICING tiers 3 with exact price strings "Rs 15,000"/"Rs 45,000"/"Custom" and middle has badge; TEAM length 7 with exact roles; ROADMAP 4 milestones with years ["2025","2025","2026","2026"]; PRODUCTS ids unique, casing `Physio@Home` (assert `PRODUCTS[2].name === "Physio@Home"`).
Playwright (`pnpm add -D @playwright/test && pnpm exec playwright install --with-deps chromium`): `tests/e2e/tabs.spec.ts` — goto `/products`, keyboard-navigate tabs, expect panel change; `?product=physio` selects Physio@Home; `tests/e2e/nav.spec.ts` — all 5 nav links resolve 200 and `h1` contains expected gradient words. `playwright.config.ts`: `webServer: { command: "pnpm dev", url: "http://localhost:3000", reuseExistingServer: true }`, `use: { baseURL }`.
DONE WHEN: `pnpm test` + `pnpm exec playwright test` green.
Then: REVIEW-REQUEST-S2.md, PROGRESS → CURRENT SPRINT: 3, commit.
