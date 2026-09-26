import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Use on navy/dark sections: swaps the middle gradient stop to full-strength gold (A-2 inverse). */
  onDark?: boolean;
};

export function GradientText({ children, onDark = false }: Props) {
  const stops = onDark
    ? "var(--color-dc-teal-500), var(--color-dc-gold-500), var(--color-dc-leaf-500)"
    : "var(--color-dc-teal-500), var(--color-dc-gold-600), var(--color-dc-leaf-500)";
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: `linear-gradient(90deg, ${stops})` }}
    >
      {children}
    </span>
  );
}
