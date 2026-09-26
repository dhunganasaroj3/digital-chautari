import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`rounded-pill bg-accent-gold font-body text-small text-dc-navy-900 inline-flex items-center px-3 py-1 font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
