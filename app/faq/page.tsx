import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { FAQS } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on services, pricing, response times, and Physio@Home.",
};

export default function FaqPage() {
  return (
    <>
      <section className="section-hero relative">
        <div aria-hidden className="hero-bg pointer-events-none absolute inset-0" />
        <div className="container-dc relative">
          <div className="text-col">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-h2 nav:text-h2-lg mt-4 font-extrabold">
              Frequently asked questions
            </h2>
          </div>
        </div>
      </section>

      <Section spacing="standard">
        <div className="container-dc">
          <StaggerGroup className="flex max-w-3xl flex-col gap-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                data-reveal
                className="group rounded-card border-border-default bg-surface-card border"
              >
                <summary className="p-card font-heading text-h3 nav:text-h3-lg flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    aria-hidden
                    className="text-action size-5 shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="text-small-lg text-text-muted nav:text-base px-card pb-card">
                  {faq.a}
                </p>
              </details>
            ))}
          </StaggerGroup>
        </div>
      </Section>
    </>
  );
}
