import type { ReactNode } from "react";

export function PillTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`rounded-pill border-border-default bg-surface-card font-body text-small text-text-muted inline-flex items-center border px-3 py-1 ${className}`}
    >
      {children}
    </span>
  );
}
