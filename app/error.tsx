"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section-hero relative">
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0" />
      <div className="container-dc relative">
        <div className="text-col">
          <h1 className="font-heading text-h1 nav:text-h1-lg font-extrabold">
            Something went wrong.
          </h1>
          <p className="text-lede text-text-muted nav:text-lede-lg mt-4">
            An unexpected error interrupted this page. Trying again usually fixes it.
          </p>
          <div className="mt-8">
            <Button type="button" onClick={() => reset()}>
              <RotateCcw className="size-4" aria-hidden />
              Try again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
