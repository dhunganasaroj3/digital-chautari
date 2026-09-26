/* Presentation-level shared constants + tiny pure helpers (no React). */

import {
  Package,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  Cpu,
  HeartHandshake,
  Megaphone,
  Clapperboard,
  Code2,
  Palette,
  FolderCheck,
  Smile,
  Eye,
  Repeat,
  Sprout,
  Video,
  HeartPulse,
  Stethoscope,
  ShoppingCart,
  Building2,
  GraduationCap,
  Plane,
  Newspaper,
  Search,
  PenTool,
  Rocket,
  Share2,
  BarChart3,
  PenLine,
  Lightbulb,
  Globe,
  Smartphone,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Typed registry resolving the icon-name strings in lib/data/* to lucide components. */
export const ICONS = {
  Package,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  Cpu,
  HeartHandshake,
  Megaphone,
  Clapperboard,
  Code2,
  Palette,
  FolderCheck,
  Smile,
  Eye,
  Repeat,
  Sprout,
  Video,
  HeartPulse,
  Stethoscope,
  ShoppingCart,
  Building2,
  GraduationCap,
  Plane,
  Newspaper,
  Search,
  PenTool,
  Rocket,
  Share2,
  BarChart3,
  PenLine,
  Lightbulb,
  Globe,
  Smartphone,
  Wrench,
} as const;

export type IconName = keyof typeof ICONS;

export const toIcon = (name: IconName): LucideIcon => ICONS[name];

export const CHIP_TONES = [
  "bg-chip-1",
  "bg-chip-2",
  "bg-chip-3",
  "bg-chip-4",
  "bg-chip-5",
] as const;

export const chipTone = (i: number) => CHIP_TONES[((i % 5) + 5) % 5] ?? "bg-chip-1";

/** Splits a title around the exact `gradient` substring → [before, after]. */
export function splitGradient(title: string, gradient: string): [string, string] {
  const idx = title.indexOf(gradient);
  if (idx === -1) return [title, ""];
  return [title.slice(0, idx), title.slice(idx + gradient.length)];
}

/** "2026-03-12" → "March 12, 2026" (UTC-anchored, so it never shifts a day). */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
