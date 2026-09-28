"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap/plugins";
import { EASE, MOTION } from "@/lib/gsap/eases";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GradientText } from "@/components/ui/GradientText";
import { splitGradient } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  /** Exact substring of `title` to wrap in the brand gradient. */
  gradient: string;
  lede: string;
  /** Slots below the lede — CTA buttons, stat bar. */
  children?: ReactNode;
  /** D-8 default is left-aligned; opt into centered heroes. */
  center?: boolean;
};

/**
 * Client implementation of the site Hero with the orchestrated entrance:
 * eyebrow drops in, title lines pour up through their masks, lede and
 * CTA slots settle underneath, and the background wash drifts on scroll.
 * Reduced-motion users get the static hero immediately.
 */
export function HeroIntro({ eyebrow, title, gradient, lede, children, center = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [before, after] = splitGradient(title, gradient);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Play-once guard: gsap.matchMedia re-runs this handler on every
        // ScrollTrigger.refresh (webfont swaps re-split headlines, content
        // resizes). Re-running the entrance would replay — and re-hide —
        // an already-settled hero, which flashes for users and breaks
        // contrast scans. Scrub links below re-create; entrances don't.
        if (scope.dataset.introPlayed === "true") return;
        scope.dataset.introPlayed = "true";
        const q = gsap.utils.selector(scope);
        const titleEl = q("[data-hero-title]")[0];
        const split =
          titleEl &&
          SplitText.create(titleEl, {
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
                delay: 0.18,
                overwrite: true,
              }),
          });

        gsap
          .timeline({ defaults: { ease: EASE.silky } })
          .from(q("[data-hero-eyebrow]"), { y: -14, autoAlpha: 0, duration: 0.7 }, 0.05)
          .from(q("[data-hero-lede]"), { y: 26, autoAlpha: 0, duration: 0.9 }, 0.7);

        const slots = q("[data-hero-slot] > *");
        if (slots.length) {
          gsap.from(slots, { y: 22, autoAlpha: 0, duration: 0.8, stagger: 0.12, delay: 0.95 });
        }

        // Background wash drifts slower than the page — depth without noise.
        gsap.to(q("[data-hero-bg]"), {
          yPercent: 16,
          ease: EASE.scrub,
          scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
        });

        return () => split?.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="section-hero relative">
      {/* overscoped vertically so the scroll drift never exposes an edge */}
      <div
        aria-hidden
        data-hero-bg
        className="hero-bg pointer-events-none absolute inset-x-0 top-[-10%] bottom-[-10%]"
      />
      <div className="container-dc relative">
        <div className={`text-col ${center ? "mx-auto text-center" : ""}`}>
          <div data-hero-eyebrow>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 data-hero-title className="font-heading text-h1 nav:text-h1-lg mt-4 font-extrabold">
            {before}
            <GradientText>{gradient}</GradientText>
            {after}
          </h1>
          <p data-hero-lede className="text-lede text-text-muted nav:text-lede-lg mt-4">
            {lede}
          </p>
        </div>
        {children ? (
          <div data-hero-slot className="mt-8">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
