import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Renders the whole card as a link. */
  href?: string;
  /** Marks the card for the canonical GSAP reveal when inside a StaggerGroup. */
  reveal?: boolean;
  /** Sets data-scheme="dark" on the card itself (token remap for stand-out tiers). */
  dark?: boolean;
  /** Set false for static containers (forms, map) — no hover lift. */
  hover?: boolean;
  className?: string;
};

export function Card({
  children,
  href,
  reveal = false,
  dark = false,
  hover = true,
  className = "",
}: Props) {
  const classes = `group rounded-card border border-border-default bg-surface-card p-card ${
    hover
      ? "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      : ""
  } ${dark ? "text-text-primary" : ""} ${className}`;
  const scheme = dark ? "dark" : undefined;
  if (href) {
    return (
      <Link href={href} data-reveal={reveal || undefined} data-scheme={scheme} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <div data-reveal={reveal || undefined} data-scheme={scheme} className={classes}>
      {children}
    </div>
  );
}
