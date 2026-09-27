import Link from "next/link";
import { SITE } from "@/lib/data/site";

type LinkItem = { label: string; href: string };

function FooterColumn({ title, links }: { title: string; links: readonly LinkItem[] }) {
  return (
    <div>
      <h3 className="text-eyebrow-lg tracking-eyebrow text-accent-gold font-semibold uppercase">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-small-lg text-text-muted hover:text-action transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-scheme="dark" className="section-tight bg-surface text-text-primary">
      <div className="container-dc">
        {/* Column headings are h3 — give them an h2 parent heading (axe heading-order). */}
        <h2 className="sr-only">Footer</h2>
        <div className="nav:grid-cols-4 grid grid-cols-2 gap-8">
          <div className="nav:col-span-1 col-span-2">
            <div className="flex items-center gap-3">
              <span className="from-dc-teal-500 to-dc-teal-600 font-heading grid size-10 place-items-center rounded-xl bg-gradient-to-br text-sm font-extrabold text-white">
                DC
              </span>
              <span className="font-heading text-base font-bold">{SITE.name}</span>
            </div>
            <p className="text-small-lg text-text-muted mt-4">{SITE.footer.blurb}</p>
          </div>
          <FooterColumn title="Company" links={SITE.footer.company} />
          <FooterColumn title="Services" links={SITE.footer.services} />
          <FooterColumn title="Legal" links={SITE.footer.legal} />
        </div>
        <p className="border-border-default text-small text-text-muted mt-8 border-t pt-6 text-center">
          © 2025–{year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
