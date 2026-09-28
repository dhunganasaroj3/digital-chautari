"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { ScrollSmoother } from "@/lib/gsap/plugins";

const SHOW_AFTER = 480;

/**
 * Floating scroll-to-top button for long pages. Appears after the visitor
 * has scrolled about half a viewport; glides to the top through
 * ScrollSmoother when it is active, native smooth scrolling otherwise.
 * Fixed UI must live OUTSIDE #smooth-content (transforms break position:
 * fixed), which is why this mounts beside the site header in the layout.
 *
 * While floating, the button must never sit on top of another interactive
 * control (a full-width pricing CTA, for instance) — elementsFromPoint
 * hit-tests the stack under the button and fades it out for that scroll
 * position instead of blocking clicks.
 */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const evaluate = () => {
      const show = window.scrollY > SHOW_AFTER;
      let overlaid = false;
      const fab = fabRef.current;
      if (show && fab) {
        const r = fab.getBoundingClientRect();
        // Sample the whole footprint, not just the center — a CTA's edge can
        // sit under the button's rim while the center is over card padding.
        const pts: [number, number][] = [
          [r.left + 4, r.top + 4],
          [r.right - 4, r.top + 4],
          [r.left + 4, r.bottom - 4],
          [r.right - 4, r.bottom - 4],
          [r.left + r.width / 2, r.top + r.height / 2],
        ];
        for (const [x, y] of pts) {
          const stack = document.elementsFromPoint(x, y);
          const below = stack.slice(stack.indexOf(fab) + 1);
          if (
            below.some((el) => el.closest("a, button, [role='button'], input, textarea, select"))
          ) {
            overlaid = true;
            break;
          }
        }
      }
      setVisible((prev) => (prev === show ? prev : show));
      setBlocked((prev) => (prev === overlaid ? prev : overlaid));
    };
    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    // ScrollSmoother's eased settle can stop firing scroll events a few px
    // short of the final resting position — a cheap interval keeps the
    // overlap state honest at rest, not just while scrolling.
    const tick = setInterval(evaluate, 250);
    return () => {
      window.removeEventListener("scroll", evaluate);
      clearInterval(tick);
    };
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

  const shown = visible && !blocked;
  return (
    <button
      ref={fabRef}
      type="button"
      onClick={scrollTop}
      aria-label="Scroll back to top"
      className={`bg-action ring-surface text-on-action shadow-card-hover hover:bg-action-hover focus-visible:rounded-pill fixed right-6 bottom-6 z-40 grid size-11 place-items-center rounded-full ring-2 transition-[opacity,transform] duration-300 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
