import { CustomEase } from "@/lib/gsap/plugins";

/**
 * Signature motion curves (motion spec v2). `swoosh` is the site's
 * signature: a fast attack with a long, silky settle — the curve that
 * makes entrances feel "poured in" rather than tweened. `silky` is the
 * softer sibling for supporting elements.
 */
CustomEase.create("dc.swoosh", "M0,0 C0.7,0 0.16,1 1,1");
CustomEase.create("dc.silky", "M0,0 C0.32,0.04 0.2,1 1,1");

export const EASE = {
  /** Hero titles, section headline masks — the signature entrance curve. */
  swoosh: "dc.swoosh",
  /** Supporting elements: ledes, cards, secondary UI. */
  silky: "dc.silky",
  /** General-purpose reveals where the signature curve would over-signal. */
  out: "power3.out",
  /** Scroll-scrubbed timelines (parallax, progress) — never eased. */
  scrub: "none",
} as const;

/** Canonical motion timing — the only place durations/staggers live. */
export const MOTION = {
  /** Entrance choreography (hero, headline sequences). */
  entrance: { duration: 1.0, stagger: 0.09 },
  /** Scroll-triggered reveals. */
  reveal: { duration: 0.8, ease: EASE.silky, stagger: 0.08, y: 28, start: "top 88%" },
  /** Micro-interactions (magnetic hover, hovers). */
  micro: { duration: 0.35, ease: EASE.swoosh },
  /** Scroll-scrubbed effects. */
  scrub: { ease: EASE.scrub },
} as const;
