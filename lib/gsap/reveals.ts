import { gsap, ScrollTrigger } from "@/lib/gsap/plugins";
import { MOTION } from "@/lib/gsap/eases";

/**
 * Canonical reveal constants — motion spec v2: 0.8s silky fade/rise,
 * 80ms stagger, 28px rise, trigger at 88% viewport. Longer and softer
 * than v1's 0.45s power2 snap so reveals read as motion, not blinks.
 */
export const REVEAL = {
  duration: MOTION.reveal.duration,
  ease: MOTION.reveal.ease,
  stagger: MOTION.reveal.stagger,
  y: MOTION.reveal.y,
  start: MOTION.reveal.start,
} as const;

/**
 * Reveals every [data-reveal] descendant of `scope`, batched.
 * `data-reveal="scale"` gets a grow-in (cards); plain `data-reveal`
 * gets the fade/rise. Reduced-motion users get nothing (elements stay
 * visible — guaranteed by tests/e2e/reduced-motion.spec.ts).
 *
 * Idempotent across context re-runs: gsap.matchMedia handlers re-run on
 * every ScrollTrigger.refresh (font swaps, content resize), which would
 * otherwise re-hide already-revealed elements and flash them. Elements
 * already marked revealed are left untouched.
 */
export function staggerReveal(scope: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.dataset.revealed !== "true",
    );
    const scaleItems = items.filter((el) => el.dataset.reveal === "scale");
    const riseItems = items.filter((el) => el.dataset.reveal !== "scale");

    const settle = (batch: HTMLElement[]) => {
      batch.forEach((el) => (el.dataset.revealed = "true"));
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        stagger: REVEAL.stagger,
        overwrite: true,
        // Drop the inline transform once revealed — it would otherwise
        // override the CSS hover:-translate-y-1 lift on cards.
        clearProps: "transform",
      });
    };

    if (riseItems.length) {
      gsap.set(riseItems, { autoAlpha: 0, y: REVEAL.y });
      ScrollTrigger.batch(riseItems, {
        start: REVEAL.start,
        once: true,
        onEnter: (batch) => settle(batch as HTMLElement[]),
      });
    }
    if (scaleItems.length) {
      gsap.set(scaleItems, { autoAlpha: 0, y: REVEAL.y * 0.5, scale: 0.96 });
      ScrollTrigger.batch(scaleItems, {
        start: REVEAL.start,
        once: true,
        onEnter: (batch) => settle(batch as HTMLElement[]),
      });
    }
  });
  return () => mm.revert();
}
