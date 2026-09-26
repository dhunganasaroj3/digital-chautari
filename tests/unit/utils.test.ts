import { describe, expect, it } from "vitest";
import { CHIP_TONES, chipTone } from "@/lib/utils";

describe("chipTone", () => {
  it("cycles through the 5 pastel tones in order", () => {
    expect(chipTone(0)).toBe("bg-chip-1");
    expect(chipTone(1)).toBe("bg-chip-2");
    expect(chipTone(2)).toBe("bg-chip-3");
    expect(chipTone(3)).toBe("bg-chip-4");
    expect(chipTone(4)).toBe("bg-chip-5");
  });

  it("wraps around after 5 (spec: rotate via index)", () => {
    expect(chipTone(5)).toBe("bg-chip-1");
    expect(chipTone(7)).toBe("bg-chip-3");
    expect(chipTone(12)).toBe("bg-chip-3");
  });

  it("exposes exactly the 5 chip background tokens", () => {
    expect(CHIP_TONES).toHaveLength(5);
    expect(CHIP_TONES.every((c) => /^bg-chip-[1-5]$/.test(c))).toBe(true);
  });
});
