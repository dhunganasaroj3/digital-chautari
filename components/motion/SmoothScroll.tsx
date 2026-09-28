"use client";

import type { ReactNode } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap/plugins";

/**
 * Site-wide inertia scrolling. ScrollSmoother is created only for
 * fine-pointer devices without a reduced-motion preference; everyone
 * else (touch, assistive settings) keeps fully native scrolling.
 *
 * DOM contract (ScrollSmoother): the wrapper becomes position:fixed
 * when active, so the site header lives OUTSIDE these divs in the
 * layout and is itself position:fixed; content padding-top reserves
 * its space in both modes.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        smooth: 1.2,
        smoothTouch: false,
        effects: false,
        ignoreMobileResize: true,
      });

      // ScrollTrigger caches trigger positions at refresh time and its
      // auto-refresh events don't include content growth. Content that
      // streams/hydrates after this point (dev route compilation, images,
      // accordion toggles) would leave every position stale — recompute
      // when the content element's size settles.
      const content = document.getElementById("smooth-content");
      let refreshTimer = 0;
      let lastHeight = 0;
      let resizeObserver: ResizeObserver | undefined;
      if (content) {
        // Sub-threshold size changes (webfont swap, SplitText re-split)
        // don't move trigger positions enough to justify a refresh — and
        // every refresh re-runs all matchMedia motion contexts. Only
        // real content growth (accordions, streamed sections) refreshes.
        lastHeight = content.clientHeight;
        resizeObserver = new ResizeObserver((entries) => {
          const height = entries[0]?.contentRect.height ?? 0;
          if (Math.abs(height - lastHeight) < 12) return;
          lastHeight = height;
          window.clearTimeout(refreshTimer);
          refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
        });
        resizeObserver.observe(content);
      }

      return () => {
        resizeObserver?.disconnect();
        window.clearTimeout(refreshTimer);
        smoother.kill();
      };
    });
    return () => mm.revert();
  });

  return (
    // wrapper stays a plain block: as a fixed-height flex parent it would
    // shrink #smooth-content to the viewport, and ScrollSmoother sizes the
    // scrollable body from content.clientHeight (→ no scroll range at all)
    <div id="smooth-wrapper">
      <div id="smooth-content" className="flex min-h-screen flex-col pt-16">
        {children}
      </div>
    </div>
  );
}
