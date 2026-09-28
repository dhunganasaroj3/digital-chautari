import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/home";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Parallax } from "@/components/motion/Parallax";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

/** Alternating scroll depth for the three cards — subtle, not stagey. */
const DEPTH = [0.05, -0.035, 0.05] as const;

export function Testimonials() {
  return (
    <Section spacing="standard">
      <SectionHeading eyebrow="Kind words" title="What clients say" />
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, i) => (
          <Parallax key={testimonial.name} amount={DEPTH[i % DEPTH.length] ?? 0}>
            <Card reveal="scale" className="flex flex-col">
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="fill-accent-gold text-accent-gold size-4" />
                ))}
              </div>
              <span className="sr-only">Rated 5 out of 5</span>
              <blockquote className="text-lede nav:text-lede-lg mt-4 flex-1">
                “{testimonial.quote}”
              </blockquote>
              <footer className="text-small mt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-text-muted">{testimonial.role}</p>
              </footer>
            </Card>
          </Parallax>
        ))}
      </StaggerGroup>
    </Section>
  );
}
