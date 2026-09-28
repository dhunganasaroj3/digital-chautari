"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap/plugins";

type Props = {
  children: ReactNode;
  className?: string;
  /** Magnet pull on the button shell (0–1). Label lags at ~40% of this. */
  strength?: number;
};

/**
 * Magnetic hover wrapper: the wrapped button leans toward the cursor
 * with its label trailing slightly behind — the label lag is what
 * makes it feel physical. Fine-pointer devices only; reduced-motion
 * and touch users get a normal button.
 */
export function MagneticButton({ children, className = "", strength = 0.35 }: Props) {
  const shell = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const outer = shell.current;
      const inner = label.current;
      if (!outer || !inner) return;
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const shellX = gsap.quickTo(outer, "x", { duration: 0.5, ease: "power3.out" });
        const shellY = gsap.quickTo(outer, "y", { duration: 0.5, ease: "power3.out" });
        const labelX = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
        const labelY = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = outer.getBoundingClientRect();
          const relX = event.clientX - (rect.left + rect.width / 2);
          const relY = event.clientY - (rect.top + rect.height / 2);
          shellX(relX * strength);
          shellY(relY * strength);
          labelX(relX * strength * 0.4);
          labelY(relY * strength * 0.4);
        };
        const onLeave = () => {
          shellX(0);
          shellY(0);
          labelX(0);
          labelY(0);
        };

        outer.addEventListener("pointermove", onMove);
        outer.addEventListener("pointerleave", onLeave);
        return () => {
          outer.removeEventListener("pointermove", onMove);
          outer.removeEventListener("pointerleave", onLeave);
          gsap.set([outer, inner], { clearProps: "transform" });
        };
      });
      return () => mm.revert();
    },
    { scope: shell },
  );

  return (
    <div ref={shell} className={`inline-block ${className}`}>
      <div ref={label}>{children}</div>
    </div>
  );
}
