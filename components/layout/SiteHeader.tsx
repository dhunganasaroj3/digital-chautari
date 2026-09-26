"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) burgerRef.current?.focus();
  }, []);

  // Adjust state during render on route change (React's documented pattern):
  // any navigation — link click, back/forward — closes the menu.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="border-border-default sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container-dc flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Digital Chautari — home">
          <span className="from-dc-teal-500 to-dc-teal-600 font-heading grid size-10 place-items-center rounded-xl bg-gradient-to-br text-sm font-extrabold text-white">
            DC
          </span>
          <span className="flex flex-col">
            <span className="font-heading text-base font-bold">{SITE.name}</span>
            <span className="text-small text-text-muted hidden sm:block">{SITE.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="nav:flex hidden items-center gap-6">
          {SITE.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-small-lg hover:text-action font-medium transition-colors ${
                  active ? "text-action font-semibold" : "text-text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav:block hidden">
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="nav:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {open && <MobileNav onClose={close} />}
    </header>
  );
}
