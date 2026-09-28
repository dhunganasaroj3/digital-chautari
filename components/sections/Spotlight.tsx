import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PHYSIO_SPOTLIGHT } from "@/lib/data/products";

export function Spotlight() {
  return (
    <Section dark>
      <SectionHeading dark eyebrow={PHYSIO_SPOTLIGHT.eyebrow} title={PHYSIO_SPOTLIGHT.title} />
      <Reveal>
        <p className="text-col text-lede nav:text-lede-lg text-text-muted mt-4">
          {PHYSIO_SPOTLIGHT.body}
        </p>
        <Button href={PHYSIO_SPOTLIGHT.cta.href} className="mt-6">
          {PHYSIO_SPOTLIGHT.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
