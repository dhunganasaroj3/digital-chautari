export const CONTACT_HERO = {
  eyebrow: "Contact",
  title: "Let's start a conversation",
  gradient: "conversation",
  lede: "Tell us where you're headed — we'll help you build the bridge.",
} as const;

export const INFO_CARDS = [
  { icon: "MapPin", title: "Address", body: "Kathmandu, Nepal" },
  { icon: "Mail", title: "Email", body: "hello@digitalchautari.com.np" },
  { icon: "Phone", title: "Phone", body: "+977 01-1234567" },
  { icon: "Clock", title: "Business Hours", body: "Sun–Fri, 10:00–18:00 NPT" },
] as const;

export const DIRECT_LINES = {
  eyebrow: "Direct lines",
  title: "Reach the right team",
  items: [
    { icon: "Megaphone", title: "Marketing", email: "marketing@digitalchautari.com.np" },
    { icon: "Video", title: "Content Studio", email: "studio@digitalchautari.com.np" },
    { icon: "Code2", title: "Software Dev", email: "dev@digitalchautari.com.np" },
    { icon: "Briefcase", title: "Business Dev", email: "business@digitalchautari.com.np" },
  ],
} as const;

export const RESPONSE_TIMES = {
  title: "Response times",
  items: [
    { icon: "Mail", label: "Email", value: "Within 24 hours" },
    { icon: "FileText", label: "Proposals", value: "2–3 days" },
    { icon: "Zap", label: "Urgent requests", value: "Same day" },
  ],
} as const;
