"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { staggerReveal } from "@/lib/gsap/reveals";

/** Wrap a grid/list; mark items with `data-reveal` (e.g. <Card reveal>). */
export function StaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current) return staggerReveal(ref.current);
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
