"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap/plugins";
import { EASE } from "@/lib/gsap/eases";

type Props = {
  children: ReactNode;
  className?: string;
  /** Fraction of the viewport height the element travels over its pass.
   *  Positive drifts down-relative (appears slower/farther), negative
   *  counter-moves (appears closer). 0.12–0.2 reads as tasteful depth. */
  amount?: number;
};

/**
 * Scroll-scrubbed depth: wraps decorative content (glows, mockups,
 * cards in alternating columns) and moves it across the viewport at
 * its own rate while the page scrolls past. Transform-only.
 */
export function Parallax({ children, className = "", amount = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => window.innerHeight * amount;
        gsap.fromTo(
          el,
          { y: distance },
          {
            y: () => -distance(),
            ease: EASE.scrub,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
