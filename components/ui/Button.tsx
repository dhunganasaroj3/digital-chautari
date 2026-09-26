import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "ghostDark" | "pill" | "onGradient" | "ghostOnGradient";
  className?: string;
  onClick?: () => void;
};

export function Button({ href, children, variant = "primary", className = "", onClick }: Props) {
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
  return (
    <Link href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
