import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Use on navy sections: full-strength gold middle stop instead of A-2's light-bg gold. */
  onDark?: boolean;
};

export function GradientText({ children, onDark = false }: Props) {
  return (
    <span
      className={`bg-clip-text text-transparent ${onDark ? "gradient-text-dark" : "gradient-text"}`}
    >
      {children}
    </span>
  );
}
