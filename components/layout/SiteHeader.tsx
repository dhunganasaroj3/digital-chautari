"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    // fixed (not sticky): must sit outside ScrollSmoother's transformed
    // #smooth-content — see components/motion/SmoothScroll.tsx. Opaque, not
    // translucent: every level of glass let scrolled content ghost through.
    // NOTE: backdrop-filter here makes this header the containing block for
    // fixed descendants — the menu scrim must portal to <body>, not render
    // inside.
    <header className="border-border-default fixed inset-x-0 top-0 z-50 border-b bg-white">
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

      {open && (
        <>
          {/* Portal: the header's own styles make it a containing block for
              fixed children, so a fixed scrim inside would cover only the
              header box. From <body> it covers the real viewport, under the
              z-50 header, dimming the page so the panel reads as modal. */}
          {createPortal(
            <div
              aria-hidden
              onClick={() => close()}
              className="bg-dc-navy-900/50 nav:hidden fixed inset-x-0 top-16 bottom-0 z-40"
            />,
            document.body,
          )}
          <MobileNav onClose={close} />
        </>
      )}
    </header>
  );
}
