export const SITE = {
  name: "Digital Chautari",
  tagline: "Creative Technology Company",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    blurb:
      "A creative technology company in Kathmandu — building digital bridges between ideas and impact.",
    company: [
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Digital Marketing", href: "/services#digital-marketing" },
      { label: "Content Creation", href: "/services#content-creation" },
      { label: "Software Development", href: "/services#software-development" },
      { label: "Pricing", href: "/services#pricing" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
} as const;
