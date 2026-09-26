/* Presentation-level shared constants + tiny pure helpers (no React). */

export const CHIP_TONES = [
  "bg-chip-1",
  "bg-chip-2",
  "bg-chip-3",
  "bg-chip-4",
  "bg-chip-5",
] as const;

export const chipTone = (i: number) => CHIP_TONES[((i % 5) + 5) % 5] ?? "bg-chip-1";
