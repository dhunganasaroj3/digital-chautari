import type { ReactNode } from "react";

type Spacing = "standard" | "tight" | "hero";

const SPACING: Record<Spacing, string> = {
  standard: "section-standard",
  tight: "section-tight",
  hero: "section-hero",
};

type Props = {
  children: ReactNode;
  spacing?: Spacing;
  dark?: boolean;
  id?: string;
  className?: string;
};

export function Section({
  children,
  spacing = "standard",
  dark = false,
  id,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      data-scheme={dark ? "dark" : undefined}
      className={`${SPACING[spacing]} ${dark ? "bg-surface text-text-primary" : ""} relative ${className}`}
    >
      <div className="container-dc">{children}</div>
    </section>
  );
}
