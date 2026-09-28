"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap/plugins";
import { EASE, MOTION } from "@/lib/gsap/eases";

/**
 * Line-masked headline reveal: splits every [data-split] descendant
 * into masked lines that rise with a slight rotation — the signature
 * "poured in" entrance. Fires once when the heading enters the
 * viewport; reduced-motion users see the plain heading untouched.
 *
 * `autoSplit` re-splits when webfonts finish loading so masks never
 * wrap mid-word after a font swap.
 */
export function SplitReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Play-once guard — see HeroIntro: refresh-driven matchMedia
        // re-runs must not replay (and re-hide) settled headings.
        if (scope.dataset.introPlayed === "true") return;
        scope.dataset.introPlayed = "true";
        const targets = scope.querySelectorAll<HTMLElement>("[data-split]");
        if (!targets.length) return;
        const splits: SplitText[] = [];
        targets.forEach((el) => {
          splits.push(
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "split-line",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 115,
                  rotate: 2.5,
                  transformOrigin: "left top",
                  autoAlpha: 0,
                  duration: MOTION.entrance.duration,
                  ease: EASE.swoosh,
                  stagger: MOTION.entrance.stagger,
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                  overwrite: true,
                }),
            }),
          );
        });
        return () => splits.forEach((split) => split.revert());
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
