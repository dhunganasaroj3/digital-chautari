"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap/plugins";
import { EASE } from "@/lib/gsap/eases";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before counting (sync with a hero intro, etc.). */
  startDelay?: number;
};

const parseValue = (raw: string) => {
  const match = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match || !match[2]) return null;
  return {
    prefix: match[1] ?? "",
    target: parseFloat(match[2].replace(/,/g, "")),
    suffix: match[3] ?? "",
  };
};

/**
 * Counts up every [data-count] descendant when it enters the viewport.
 * The element's own text ("25+", "98%") defines the target; prefix and
 * suffix are preserved. Reduced-motion users simply see the final value.
 */
export function Counter({ children, className = "", startDelay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counters: gsap.core.Tween[] = [];
        scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          // The init write below mutates the DOM this parse reads — cache
          // the parsed target on the element so a re-run of this effect
          // (matchMedia refresh cycles, StrictMode dev double-invoke)
          // parses the original value, not the zero placeholder it just
          // wrote, or the count targets 0 and the stat never recovers.
          const stored = el.dataset.countTo;
          const parsed =
            stored !== undefined && stored !== ""
              ? {
                  prefix: el.dataset.countPrefix ?? "",
                  target: parseFloat(stored),
                  suffix: el.dataset.countSuffix ?? "",
                }
              : parseValue(el.textContent ?? "");
          if (!parsed || Number.isNaN(parsed.target)) return;
          el.dataset.countTo = String(parsed.target);
          el.dataset.countPrefix = parsed.prefix;
          el.dataset.countSuffix = parsed.suffix;
          const decimals = (parsed.target.toString().split(".")[1] ?? "").length;
          const state = { value: 0 };
          el.textContent = `${parsed.prefix}${(0).toFixed(decimals)}${parsed.suffix}`;
          counters.push(
            gsap.to(state, {
              value: parsed.target,
              duration: 1.6,
              delay: startDelay,
              ease: EASE.out,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
              onUpdate: () => {
                el.textContent = `${parsed.prefix}${state.value.toFixed(decimals)}${parsed.suffix}`;
              },
              onComplete: () => {
                el.textContent = `${parsed.prefix}${parsed.target}${parsed.suffix}`;
              },
            }),
          );
        });
        return () => counters.forEach((tween) => tween.kill());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
