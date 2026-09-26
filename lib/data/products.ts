export const PRODUCTS_HERO = {
  eyebrow: "Our Products",
  title: "Three ventures, one vision",
  gradient: "one vision",
  lede: "We build our own products so the work we do for you is practiced, not theoretical.",
} as const;

export const PRODUCTS = [
  {
    id: "eco",
    tab: "Eco Creative Marketing Agency",
    category: "Marketing Agency",
    icon: "Sprout",
    name: "Eco Creative Marketing Agency",
    body: "Performance-first digital marketing for purpose-led brands: SEO, social, and campaigns that compound.",
    stats: [
      { value: "40+", label: "Clients" },
      { value: "250+", label: "Campaigns" },
      { value: "12", label: "Industries" },
    ],
    cta: { label: "Visit Eco Creative →", href: "#" },
    external: true,
  },
  {
    id: "one",
    tab: "One Content Creation Studio",
    category: "Content Studio",
    icon: "Video",
    name: "One Content Creation Studio",
    body: "A studio for scroll-stopping content — strategy, video, design, and copy produced under one roof.",
    stats: [
      { value: "1M+", label: "Views" },
      { value: "120+", label: "Videos" },
      { value: "8", label: "Brands" },
    ],
    cta: { label: "Explore One Studio →", href: "#" },
    external: true,
  },
  {
    id: "physio",
    tab: "Physio@Home",
    category: "Health-Tech Platform",
    icon: "HeartPulse",
    name: "Physio@Home",
    body: "Physiotherapy that comes to you: book certified physiotherapists for at-home sessions across Nepal.",
    stats: [
      { value: "500+", label: "Sessions" },
      { value: "30+", label: "Therapists" },
      { value: "4.9★", label: "Rating" },
    ],
    cta: { label: "Learn more about Physio@Home →", href: "#" },
    external: true,
  },
] as const;

export const PHYSIO_SPOTLIGHT = {
  eyebrow: "Spotlight",
  title: "Physio@Home — healthcare reimagined",
  body: "Certified physiotherapy delivered at home — booking, scheduling, and progress tracking in one app.",
  cta: { label: "Get in Touch →", href: "/contact" },
} as const;
