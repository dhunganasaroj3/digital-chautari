import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Canonical reveal constants — spec: 0.45s fade/rise, 70ms stagger, trigger at 88% viewport. */
export const REVEAL = {
  duration: 0.45,
  ease: "power2.out",
  stagger: 0.07,
  y: 16,
  start: "top 88%",
} as const;

/** Reveals every [data-reveal] descendant of `scope`, batched. Reduced-motion users get none. */
export function staggerReveal(scope: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const items = scope.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.set(items, { opacity: 0, y: REVEAL.y });
    ScrollTrigger.batch(items, {
      start: REVEAL.start,
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          stagger: REVEAL.stagger,
          overwrite: true,
          // Drop the inline transform once revealed — it would otherwise override
          // the CSS hover:-translate-y-1 lift on cards (computed identity matrix).
          clearProps: "transform",
        }),
    });
  });
  return () => mm.revert();
}
