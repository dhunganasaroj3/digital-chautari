import Link from "next/link";

type Props = {
  /** When omitted, renders a native <button> (type/disabled props apply). */
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "ghostDark" | "pill" | "onGradient" | "ghostOnGradient";
  /** External URL: renders <a target="_blank" rel="noreferrer"> instead of next/link. */
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: Props) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn px-6 py-[13px] font-body text-btn font-semibold transition-transform duration-200 hover:-translate-y-0.5 nav:text-btn-lg";
  const variants = {
    primary: "bg-action text-on-action hover:bg-action-hover",
    ghost: "border border-border-default bg-surface-card text-text-primary hover:border-action",
    ghostDark: "border border-border-default bg-transparent text-text-primary hover:border-action",
    pill: "rounded-pill",
    onGradient: "bg-white text-action-hover hover:bg-white/90",
    ghostOnGradient: "border border-white/40 bg-transparent text-white hover:bg-white/10",
  } as const;
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} onClick={onClick} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  if (!href) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
