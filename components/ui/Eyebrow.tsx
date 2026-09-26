import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  dark?: boolean;
  className?: string;
};

export function Eyebrow({ children, dark = false, className = "" }: Props) {
  return (
    <span
      className={`rounded-pill border-border-default font-body text-eyebrow-lg tracking-eyebrow text-text-muted inline-flex items-center gap-2 border px-3 py-1 font-semibold uppercase ${
        dark ? "bg-transparent" : "bg-surface-card"
      } ${className}`}
    >
      {children}
    </span>
  );
}
