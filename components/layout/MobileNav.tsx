"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";

type Props = {
  /** Called on Esc (refocus=true → hamburger regains focus) and on link activation. */
  onClose: (refocus?: boolean) => void;
};

/** Mobile navigation panel with a keyboard focus trap and body scroll lock. */
export function MobileNav({ onClose }: Props) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

    focusables()[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose(true);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      className="border-border-default bg-surface-card nav:hidden relative border-t"
    >
      <nav aria-label="Mobile" className="container-dc flex flex-col gap-1 pt-3 pb-6">
        {SITE.nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose()}
              aria-current={active ? "page" : undefined}
              className={`rounded-btn px-3 py-3 text-base font-medium transition-colors ${
                active
                  ? "bg-dc-palteal-100 text-action font-semibold"
                  : "text-text-primary hover:bg-surface hover:text-action"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Button href="/contact" variant="primary" className="mt-3" onClick={() => onClose()}>
          Contact Us
        </Button>
      </nav>
    </div>
  );
}
