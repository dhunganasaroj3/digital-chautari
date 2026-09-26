"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { staggerReveal } from "@/lib/gsap/reveals";

/** Reveals its single child as one unit (headings, paragraphs, standalone blocks). */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current) return staggerReveal(ref.current);
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      <div data-reveal>{children}</div>
    </div>
  );
}
