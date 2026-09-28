"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/plugins";

type Props = {
  children: ReactNode;
  className?: string;
  /** Class applied to the track groups — sets item spacing (e.g. "gap-4"). */
  itemGapClass?: string;
  /** Seconds for one full loop at rest. Lower = faster. */
  speed?: number;
  /** Fade the edges so content dissolves instead of clipping. */
  mask?: boolean;
};

/**
 * Infinite, velocity-reactive marquee: the loop idles at 1×, then
 * accelerates — and reverses — with the visitor's scroll, easing back
 * to rest. Content is duplicated; the duplicate is aria-hidden and
 * hidden entirely for reduced-motion users.
 */
export function Marquee({
  children,
  className = "",
  itemGapClass = "gap-4",
  speed = 26,
  mask = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: speed, repeat: -1 });

        // Scroll velocity → target timeScale (1 = rest, up to ±4), eased
        // back toward rest on every tick so boosts decay smoothly.
        const clamp = gsap.utils.clamp(-4, 4);
        let currentScale = 1;
        let targetScale = 1;
        const tick = () => {
          currentScale += (targetScale - currentScale) * 0.08;
          loop.timeScale(currentScale);
        };
        gsap.ticker.add(tick);

        const observer = ScrollTrigger.create({
          onUpdate: (self) => {
            targetScale = clamp(1 + self.getVelocity() / 300);
          },
        });

        // Don't burn cycles off-screen.
        const visibility = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });

        return () => {
          gsap.ticker.remove(tick);
          observer.kill();
          visibility.kill();
          loop.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      data-marquee
      className={`overflow-hidden ${mask ? "marquee-mask" : ""} ${className}`}
    >
      <div ref={trackRef} className={`flex w-max items-center ${itemGapClass}`}>
        <div className={`flex items-center ${itemGapClass}`}>{children}</div>
        <div className={`marquee-clone flex items-center ${itemGapClass}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
