"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { ScrollSmoother } from "@/lib/gsap/plugins";

const SHOW_AFTER = 480;

/**
 * Floating scroll-to-top button for long pages. Appears after the visitor
 * has scrolled about half a viewport; glides to the top through
 * ScrollSmoother when it is active, native smooth scrolling otherwise.
 * Fixed UI must live OUTSIDE #smooth-content (transforms break position:
 * fixed), which is why this mounts beside the site header in the layout.
 */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > SHOW_AFTER;
      setVisible((prev) => (prev === show ? prev : show));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const smoother = ScrollSmoother.get();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (smoother && !reduced) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll back to top"
      className={`bg-action text-on-action shadow-card-hover hover:bg-action-hover focus-visible:rounded-pill fixed right-6 bottom-6 z-40 grid size-11 place-items-center rounded-full transition-[opacity,transform] duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
