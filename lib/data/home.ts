export const HERO = {
  eyebrow: "Welcome to Digital Chautari",
  title: "We build digital bridges between ideas and impact",
  gradient: "digital bridges",
  lede: "Digital Chautari is a Kathmandu company doing digital marketing, content creation, and health-tech software under one roof. We run three of our own products and bring that experience to client projects.",
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
    body: "We report on traffic, leads, and revenue, and we adjust course when the numbers say so.",
  },
  {
    icon: "Sparkles",
    title: "Creative-First",
    body: "Design and writing come first, so the brand holds up on every channel.",
  },
  {
    icon: "Cpu",
    title: "Tech-Powered",
    body: "We build on modern tools and automate whatever shouldn't be manual.",
  },
  {
    icon: "HeartHandshake",
    title: "Client-Centric",
    body: "Clear pricing, a named team, and support that doesn't stop at launch.",
  },
] as const;

export const WHO_WE_ARE = {
  title: "A Chautari where ideas meet execution",
  paragraphs: [
    "In Nepal, a chautari is a shady platform built under a tree, where travelers rest and trade news before moving on. Digital Chautari is our version of one: marketers, creators, and engineers sharing a table in Kathmandu.",
    "Founded in 2025, we run three ventures of our own while working with clients in healthcare, commerce, and media. What we recommend to you is usually something we already ship ourselves.",
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
      body: "SEO, social, and paid campaigns for brands that care about more than clicks.",
      href: "/products",
    },
    {
      icon: "Video",
      category: "Content Studio",
      name: "One Content Creation Studio",
      body: "Strategy, video, design, and copy from one studio team that plans and measures together.",
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
    body: "Clinic sites and health platforms, built around how patients actually behave.",
  },
  {
    icon: "ShoppingCart",
    title: "E-Commerce",
    body: "Storefronts and campaigns that bring customers back, not just once.",
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
    body: "Stories and bookings that put Nepal on travelers' shortlists.",
  },
  {
    icon: "Newspaper",
    title: "Media & Publishing",
    body: "Publishing tools and content workflows for newsrooms and creators.",
  },
] as const;

export const PROCESS = {
  title: "Our 4-step process",
  steps: [
    {
      icon: "Search",
      title: "Discover",
      body: "We start with your goals, your market, and the people you serve.",
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
    quote: "They turned a pile of half-finished ideas into a site we're proud to send people to.",
    name: "Aarya Shrestha",
    role: "Founder, Himalaya Organics",
  },
  {
    quote:
      "Engagement doubled in three months after their studio took over our social. We just approve.",
    name: "Bibek Thapa",
    role: "Marketing Head, Everest Eats",
  },
  {
    quote: "Even my least tech-savvy patients book and track their sessions without calling me.",
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
      "What still works after two years of AI overviews and zero-click searches, and what we've stopped doing.",
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
