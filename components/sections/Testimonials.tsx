import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/home";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function Testimonials() {
  return (
    <Section spacing="standard">
      <Reveal>
        <SectionHeading eyebrow="Kind words" title="What clients say" />
      </Reveal>
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <Card key={testimonial.name} reveal className="flex flex-col">
            <div className="flex gap-1" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="fill-accent-gold text-accent-gold size-4" />
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
        ))}
      </StaggerGroup>
    </Section>
  );
}
