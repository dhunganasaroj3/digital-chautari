export const ABOUT_HERO = {
  eyebrow: "About Us",
  title: "The people behind Digital Chautari",
  gradient: "people behind",
  lede: "A chautari built by marketers, creators, and engineers — headquartered in Kathmandu, shipping everywhere.",
} as const;

export const STORY = {
  eyebrow: "Our story",
  title: "From a chautari to a digital powerhouse",
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
  mission: {
    icon: "Target",
    title: "Our Mission",
    body: "To make world-class digital expertise accessible to Nepali businesses — and take Nepali products to the world.",
  },
  vision: {
    icon: "Telescope",
    title: "Our Vision",
    body: "A chautari in every corner of the digital world: the most trusted creative-technology partner in Nepal.",
  },
} as const;

export const VALUES = [
  {
    icon: "Flame",
    title: "Passion",
    body: "We care about outcomes like they're our own — because three of them are.",
  },
  {
    icon: "Lightbulb",
    title: "Creativity",
    body: "Every brief gets fresh thinking, not a recycled template.",
  },
  {
    icon: "Award",
    title: "Excellence",
    body: "Details compound. We sweat them.",
  },
  {
    icon: "Users",
    title: "Collaboration",
    body: "One team, your team — from kickoff to after launch.",
  },
] as const;

export const QUALITY = {
  eyebrow: "Trust",
  title: "Committed to quality & trust",
  items: [
    {
      icon: "BadgeCheck",
      title: "ISO 9001 Ready",
      body: "Processes documented and audited to international quality standards.",
    },
    {
      icon: "ShieldCheck",
      title: "Data Protection",
      body: "Privacy-by-default practices in everything we build and run.",
    },
    {
      icon: "Globe",
      title: "Global Delivery",
      body: "Remote-first workflows trusted by clients across time zones.",
    },
    {
      icon: "Network",
      title: "Pan-Nepal Network",
      body: "From Kathmandu to provinces — talent and reach nationwide.",
    },
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
] as const; // names are ⟨TBC⟩ → CONTENT-TODO

export const ROADMAP = {
  eyebrow: "Roadmap",
  title: "Where we're headed",
  milestones: [
    {
      year: "2025",
      title: "The Idea",
      body: "Three founders sketch a chautari for the digital age over endless cups of chiya.",
    },
    {
      year: "2025",
      title: "First Products",
      body: "Eco Creative and One Content Studio open their doors.",
    },
    {
      year: "2026",
      title: "Health-Tech Entry",
      body: "Physio@Home brings certified physiotherapy home.",
    },
    {
      year: "2026",
      title: "Company Registration",
      body: "Digital Chautari Pvt. Ltd. is formally registered.",
    },
  ],
} as const;

export const ABOUT_CTA = {
  eyebrow: "Join us",
  title: "Want to join our journey?",
  cta: { label: "Get in Touch →", href: "/contact" },
} as const;
