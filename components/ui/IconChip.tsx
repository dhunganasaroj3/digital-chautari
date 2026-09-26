import type { LucideIcon } from "lucide-react";
import { chipTone } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  /** Rotates through the 5 pastel chip tones; "gold" is the accent variant for dark banners. */
  tone?: number | "gold";
  className?: string;
};

export function IconChip({ icon: Icon, tone = 0, className = "" }: Props) {
  const toneClass =
    tone === "gold" ? "bg-accent-gold/15 text-accent-gold" : `${chipTone(tone)} text-action`;
  return (
    <span
      className={`rounded-chip grid size-11 shrink-0 place-items-center ${toneClass} ${className}`}
    >
      <Icon className="size-5" aria-hidden />
    </span>
  );
}
