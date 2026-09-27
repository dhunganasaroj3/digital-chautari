export const SERVICES_HERO = {
  eyebrow: "Our Services",
  title: "Services that drive growth",
  gradient: "drive growth",
  lede: "One team for strategy, creative, and engineering. Prices are on this page, and work runs in short sprints you can follow.",
} as const;

export const CATEGORIES = [
  {
    id: "digital-marketing",
    icon: "Megaphone",
    title: "Digital Marketing",
    body: "Campaigns built on your numbers and reported plainly: who saw, who clicked, who bought.",
    subs: [
      { icon: "Search", title: "SEO & SEM" },
      { icon: "Share2", title: "Social Media Marketing" },
      { icon: "Megaphone", title: "Paid Advertising" },
      { icon: "BarChart3", title: "Analytics & Reporting" },
    ],
  },
  {
    id: "content-creation",
    icon: "Clapperboard",
    title: "Content Creation",
    body: "Planned, produced, and measured by one studio team that works to a calendar, not to inspiration.",
    subs: [
      { icon: "Video", title: "Video Production" },
      { icon: "PenLine", title: "Copywriting & Blogs" },
      { icon: "Palette", title: "Graphic Design" },
      { icon: "Lightbulb", title: "Content Strategy" },
    ],
  },
  {
    id: "software-development",
    icon: "Code2",
    title: "Software Development",
    body: "Full-stack products from concept to launch and beyond.",
    subs: [
      { icon: "Globe", title: "Web App Development" },
      { icon: "Smartphone", title: "Mobile App Development" },
      { icon: "PenTool", title: "UI/UX Design" },
      { icon: "Wrench", title: "Maintenance & Support" },
    ],
  },
] as const;

export const PRICING = {
  eyebrow: "Pricing",
  title: "Simple, transparent pricing",
  tiers: [
    {
      name: "Starter",
      price: "Rs 15,000",
      period: "/mo",
      dark: false,
      features: [
        "1 campaign channel",
        "4 posts/mo content calendar",
        "Basic analytics report",
        "Email support",
      ],
      cta: { label: "Choose Starter →", href: "/contact" },
    },
    {
      name: "Professional",
      price: "Rs 45,000",
      period: "/mo",
      dark: true,
      badge: "Most Popular",
      features: [
        "Up to 3 campaign channels",
        "12 content assets/mo",
        "SEO + monthly reporting",
        "Dedicated manager",
        "Priority support",
      ],
      cta: { label: "Choose Professional →", href: "/contact" },
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      dark: false,
      features: [
        "Custom strategy & roadmap",
        "Full-scale production team",
        "Custom software development",
        "SLA & 24/7 support",
      ],
      cta: { label: "Talk to Sales →", href: "/contact" },
    },
  ],
} as const;

export const INDUSTRIES = {
  eyebrow: "Industries",
  title: "Who we work with",
  items: [
    { icon: "Stethoscope", title: "Healthcare" },
    { icon: "ShoppingCart", title: "E-Commerce" },
    { icon: "Building2", title: "Real Estate" },
    { icon: "GraduationCap", title: "Education" },
    { icon: "Plane", title: "Tourism" },
    { icon: "Newspaper", title: "Media" },
  ],
} as const;

export const WHY_US = {
  eyebrow: "Why us",
  title: "Why work with us",
  items: [
    "Dedicated project manager",
    "Agile development cycle",
    "Transparent pricing",
    "Post-launch support",
    "Scalable architecture",
    "Cross-platform expertise",
  ],
} as const;

export const SERVICES_CTA = {
  eyebrow: "Next step",
  title: "Let's find the right service for you",
  cta: { label: "Book a Consultation →", href: "/contact" },
  secondaryCta: { label: "View Pricing", href: "/services#pricing" },
} as const;
