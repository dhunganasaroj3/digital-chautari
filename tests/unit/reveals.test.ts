import { describe, expect, it } from "vitest";
import { REVEAL } from "@/lib/gsap/reveals";
import { EASE, MOTION } from "@/lib/gsap/eases";

/**
 * Guards the canonical motion constants against drift.
 * Spec v2: 0.8s silky reveals, 80ms stagger, 28px rise, trigger at 88%
 * viewport; 1.0s signature-swoosh entrances at 90ms stagger.
 */
describe("REVEAL constants", () => {
  it("matches the spec exactly", () => {
    expect(REVEAL.duration).toBe(0.8);
    expect(REVEAL.ease).toBe(EASE.silky);
    expect(REVEAL.stagger).toBe(0.08);
    expect(REVEAL.y).toBe(28);
    expect(REVEAL.start).toBe("top 88%");
  });
});

describe("MOTION constants", () => {
  it("keeps entrance and micro timing locked", () => {
    expect(MOTION.entrance).toEqual({ duration: 1.0, stagger: 0.09 });
    expect(MOTION.micro.duration).toBe(0.35);
  });

  it("keeps scrub easing linear", () => {
    expect(EASE.scrub).toBe("none");
  });
});
