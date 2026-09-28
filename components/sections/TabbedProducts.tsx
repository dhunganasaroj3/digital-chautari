"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Counter } from "@/components/motion/Counter";
import { staggerReveal } from "@/lib/gsap/reveals";
import { useGSAP } from "@/lib/gsap/plugins";
import { ProductMockup } from "@/components/sections/ProductMockup";
import { PRODUCTS } from "@/lib/data/products";

/** Decorative preview per venture: dashboard chart / content feed / booking app. */
const MOCKUPS = { eco: "browser", one: "feed", physio: "phone" } as const;

/**
 * Tabs are fully server-rendered (first tab) so the section never pops in
 * after hydration — a Suspense/useSearchParams boundary here was the single
 * biggest CLS source on the page. The ?product=<id> deep link is applied
 * client-side in an effect instead.
 */
export function TabbedProducts() {
  const [value, setValue] = useState<string>(PRODUCTS[0].id);
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("product");
    // transition: non-urgent update — the tab switch choreographs in after
    // hydration instead of cascading a synchronous re-render (lint: no
    // setState directly in an effect body).
    if (param && PRODUCTS.some((product) => product.id === param)) {
      startTransition(() => setValue(param));
    }
  }, []);

  // Re-run the canonical reveal each time a panel mounts so switching
  // tabs choreographs the incoming content instead of popping it in.
  useGSAP(
    () => {
      if (scope.current) return staggerReveal(scope.current);
    },
    { dependencies: [value], scope },
  );

  return (
    <Section spacing="tight">
      <div ref={scope}>
        <Tabs.Root value={value} onValueChange={setValue} activationMode="automatic">
          <Tabs.List
            aria-label="Our products"
            className="rounded-pill border-border-default bg-surface-card mx-auto flex w-fit max-w-full flex-wrap gap-1.5 border p-2"
          >
            {PRODUCTS.map((product) => (
              <Tabs.Trigger
                key={product.id}
                value={product.id}
                className="rounded-pill text-small-lg data-[state=active]:bg-action data-[state=active]:text-on-action px-4 py-2 font-semibold"
              >
                {product.tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {PRODUCTS.map((product) => {
            return (
              <Tabs.Content
                key={product.id}
                value={product.id}
                className="nav:grid-cols-2 mt-10 grid grid-cols-1 items-center gap-10"
              >
                <div data-reveal>
                  <p className="text-eyebrow tracking-eyebrow text-action nav:text-eyebrow-lg font-semibold uppercase">
                    {product.category}
                  </p>
                  <h2 className="font-heading text-h2 nav:text-h2-lg mt-2 font-bold">
                    {product.name}
                  </h2>
                  <p className="text-lede text-text-muted nav:text-lede-lg mt-3">{product.body}</p>
                  <Counter className="mt-6">
                    <div className="flex gap-8">
                      {product.stats.map((stat) => (
                        <div key={stat.label}>
                          <p data-count className="font-heading text-2xl font-extrabold">
                            {stat.value}
                          </p>
                          <p className="text-small text-text-muted">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </Counter>
                  <MagneticButton className="mt-6">
                    <Button href={product.cta.href} external={product.external}>
                      {product.cta.label}
                    </Button>
                  </MagneticButton>
                </div>
                {/* No Parallax here: a scroll-scrubbed card drifts against the
                    section boundary and collides with the dark band below at
                    mid-scroll stops. The scale reveal carries the motion. */}
                <div data-reveal="scale">
                  <ProductMockup variant={MOCKUPS[product.id]} />
                </div>
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      </div>
    </Section>
  );
}
