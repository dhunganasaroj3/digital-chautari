"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap/plugins";
import { EASE, MOTION } from "@/lib/gsap/eases";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
};

/**
 * Client implementation of SectionHeading: the h2 pours up through
 * line masks (SplitText) while eyebrow and lede settle in around it —
 * one trigger, one choreography. Reduced-motion users get the static
 * heading immediately.
 */
export function SectionIntro({
  eyebrow,
  title,
  lede,
  dark = false,
  center = false,
  className = "",
}: Props) {
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
        const q = gsap.utils.selector(scope);
        const heading = q("[data-split]")[0];

        const split =
          heading &&
          SplitText.create(heading, {
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
                scrollTrigger: { trigger: heading, start: "top 88%", once: true },
                overwrite: true,
              }),
          });

        gsap.from(q("[data-intro]"), {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          ease: EASE.silky,
          stagger: 0.12,
          scrollTrigger: { trigger: scope, start: "top 88%", once: true },
        });

        return () => split?.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={center ? `text-col mx-auto text-center ${className}` : className}>
      <div data-intro>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </div>
      <h2 data-split className="font-heading text-h2 nav:text-h2-lg mt-3 font-bold">
        {title}
      </h2>
      {lede ? (
        <div data-intro>
          <p className="text-col text-lede text-text-muted nav:text-lede-lg mt-3">{lede}</p>
        </div>
      ) : null}
    </div>
  );
}
