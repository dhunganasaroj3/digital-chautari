import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Dark/navy context — eyebrow renders in the gold accent (spec R-004/R-036). */
  dark?: boolean;
  /** "gold" = gold text/border accent; implied by `dark`. */
  tone?: "default" | "gold";
  className?: string;
};

export function Eyebrow({ children, dark = false, tone = "default", className = "" }: Props) {
  const toneClass =
    tone === "gold" || dark
      ? "border-accent-gold/40 text-accent-gold bg-transparent"
      : "border-border-default bg-surface-card text-text-muted";
  return (
    <span
      className={`rounded-pill font-body text-eyebrow-lg tracking-eyebrow inline-flex items-center gap-2 border px-3 py-1 font-semibold uppercase ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
