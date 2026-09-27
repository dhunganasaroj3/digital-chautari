"use client";

import { useSearchParams } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/data/products";
import { chipTone, toIcon } from "@/lib/utils";

/** Initial tab deep-links via ?product=<id> (validated against PRODUCTS ids). */
export function TabbedProducts() {
  const param = useSearchParams().get("product");
  const initial =
    param !== null && PRODUCTS.some((product) => product.id === param) ? param : PRODUCTS[0].id;

  return (
    <Section spacing="tight">
      <Tabs.Root key={initial} defaultValue={initial} activationMode="automatic">
        <Tabs.List
          aria-label="Our products"
          className="rounded-pill border-border-default bg-surface-card mx-auto flex w-fit max-w-full flex-wrap gap-1 border p-1"
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
        {PRODUCTS.map((product, i) => {
          const Icon = toIcon(product.icon);
          return (
            <Tabs.Content
              key={product.id}
              value={product.id}
              className="nav:grid-cols-2 mt-10 grid grid-cols-1 items-center gap-10"
            >
              <div>
                <p className="text-eyebrow tracking-eyebrow text-action nav:text-eyebrow-lg font-semibold uppercase">
                  {product.category}
                </p>
                <h2 className="font-heading text-h2 nav:text-h2-lg mt-2 font-bold">
                  {product.name}
                </h2>
                <p className="text-lede text-text-muted nav:text-lede-lg mt-3">{product.body}</p>
                <div className="mt-6 flex gap-8">
                  {product.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-2xl font-extrabold">{stat.value}</p>
                      <p className="text-small text-text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <Button href={product.cta.href} external={product.external} className="mt-6">
                  {product.cta.label}
                </Button>
              </div>
              <div
                aria-hidden
                className="rounded-card border-border-default bg-surface-card border p-4"
              >
                <div className={`rounded-chip grid aspect-video place-items-center ${chipTone(i)}`}>
                  <Icon className="text-action/40 size-16" />
                </div>
              </div>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Section>
  );
}
