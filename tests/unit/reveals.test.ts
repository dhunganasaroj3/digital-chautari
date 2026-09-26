import { describe, expect, it } from "vitest";
import { REVEAL } from "@/lib/gsap/reveals";

/**
 * Guards the canonical motion constants against drift.
 * Spec: 0.45s fades, 70ms stagger, 16px rise, trigger at 88% viewport.
 */
describe("REVEAL constants", () => {
  it("matches the spec exactly", () => {
    expect(REVEAL.duration).toBe(0.45);
    expect(REVEAL.ease).toBe("power2.out");
    expect(REVEAL.stagger).toBe(0.07);
    expect(REVEAL.y).toBe(16);
    expect(REVEAL.start).toBe("top 88%");
  });
});
