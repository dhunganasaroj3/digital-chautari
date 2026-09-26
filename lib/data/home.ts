export const HERO = {
  eyebrow: "🚀 Welcome to Digital Chautari",
  title: "We build digital bridges between ideas and impact",
  gradient: "digital bridges",
  lede: "Digital Chautari is a creative technology company in Kathmandu, Nepal — blending digital marketing, content creation, and health-tech software to turn ambitious ideas into measurable impact.",
  primaryCta: { label: "Explore Services →", href: "/services" },
  ghostCta: { label: "View Products", href: "/products" },
  stats: [
    { icon: "Package", value: "3", label: "Products" },
    { icon: "Users", value: "7+", label: "Team Members" },
    { icon: "Target", value: "100%", label: "Commitment" },
  ],
} as const;

export const FEATURES = [
  {
    icon: "TrendingUp",
    title: "Growth-Driven",
    body: "Every decision is measured against real business outcomes — traffic, leads, revenue.",
  },
  {
    icon: "Sparkles",
    title: "Creative-First",
    body: "Design and storytelling lead, so your brand sounds as good as it performs.",
  },
  {
    icon: "Cpu",
    title: "Tech-Powered",
    body: "Modern engineering and automation underpin everything we ship.",
  },
  {
    icon: "HeartHandshake",
    title: "Client-Centric",
    body: "Collaborative process, transparent pricing, and support after launch.",
  },
] as const;

export const WHO_WE_ARE = {
  title: "A Chautari where ideas meet execution",
  paragraphs: [
    "In Nepal, a chautari is a shady platform where travelers rest, share stories, and continue wiser. Digital Chautari is that gathering point for the digital age — marketers, creators, and engineers helping ambitious ideas find their footing.",
    "Founded in Kathmandu in 2025, we run three ventures of our own while partnering with clients across healthcare, commerce, and media — so the advice we give you is practiced, not theoretical.",
  ],
  checklist: [
    "Creative Strategy",
    "Brand Storytelling",
    "Full-Stack Engineering",
    "Health-Tech Expertise",
  ],
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
    {
      icon: "Sprout",
      category: "Marketing Agency",
      name: "Eco Creative Marketing Agency",
      body: "Performance-first digital marketing for purpose-led brands: SEO, social, and campaigns that compound.",
      href: "/products",
    },
    {
      icon: "Video",
      category: "Content Studio",
      name: "One Content Creation Studio",
      body: "A studio for scroll-stopping content — strategy, video, design, and copy produced under one roof.",
      href: "/products",
    },
    {
      icon: "HeartPulse",
      category: "Health-Tech Platform",
      name: "Physio@Home",
      body: "Physiotherapy that comes to you: book certified physiotherapists for at-home sessions across Nepal.",
      href: "/products",
    },
  ],
} as const;

export const SECTORS = [
  {
    icon: "Stethoscope",
    title: "Healthcare",
    body: "Patient-first digital experiences, from clinic sites to health-tech platforms.",
  },
  {
    icon: "ShoppingCart",
    title: "E-Commerce",
    body: "Storefronts and campaigns built to convert browsers into repeat buyers.",
  },
  {
    icon: "Building2",
    title: "Real Estate",
    body: "Listings, lead funnels, and brand systems for property developers.",
  },
  {
    icon: "GraduationCap",
    title: "Education",
    body: "Learning platforms and content that schools and edtechs actually use.",
  },
  {
    icon: "Plane",
    title: "Tourism & Hospitality",
    body: "Destination storytelling that puts Nepal on every itinerary.",
  },
  {
    icon: "Newspaper",
    title: "Media & Publishing",
    body: "Content engines and products for modern newsrooms and creators.",
  },
] as const;

export const PROCESS = {
  title: "Our 4-step process",
  steps: [
    {
      icon: "Search",
      title: "Discover",
      body: "We dig into your goals, market, and users before a single pixel.",
    },
    {
      icon: "PenTool",
      title: "Design",
      body: "Strategy becomes structure: wireframes, brand, and messaging.",
    },
    { icon: "Code2", title: "Develop", body: "We build, test, and iterate in agile sprints." },
    {
      icon: "Rocket",
      title: "Deliver",
      body: "Launch, measure, and keep improving after release.",
    },
  ],
} as const;

export const TESTIMONIALS = [
  {
    quote:
      "Digital Chautari turned our scattered ideas into a brand system and a website that finally converts.",
    name: "Aarya Shrestha",
    role: "Founder, Himalaya Organics",
  },
  {
    quote:
      "Their content studio doubled our engagement in three months without us lifting a finger.",
    name: "Bibek Thapa",
    role: "Marketing Head, Everest Eats",
  },
  {
    quote:
      "Physio@Home is the rare health-tech product that feels effortless for both patients and therapists.",
    name: "Dr. Sunita Maharjan",
    role: "Physiotherapist",
  },
] as const;

export const POSTS = [
  {
    slug: "local-first-content",
    title: "Why Nepali brands win with local-first content",
    category: "Content",
    date: "2026-03-12",
    readTime: "5 min read",
    excerpt:
      "Global playbooks break on local nuance. Here's how we build content calendars that actually fit how Nepal searches, shares, and buys.",
  },
  {
    slug: "seo-in-2026",
    title: "SEO in 2026: what actually moves rankings now",
    category: "Marketing",
    date: "2026-02-28",
    readTime: "7 min read",
    excerpt:
      "AI overviews, zero-click results, and E-E-A-T: the tactics that survived the last two years of search upheaval — and the ones to drop.",
  },
  {
    slug: "building-physiohome",
    title: "Building Physio@Home: lessons from health-tech in Nepal",
    category: "Engineering",
    date: "2026-02-10",
    readTime: "6 min read",
    excerpt:
      "From house-visit scheduling to therapist vetting: what we learned shipping a healthcare product outside the valley.",
  },
] as const;
