import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function ClosingCta() {
  return (
    <Section spacing="tight">
      <Reveal>
        <div className="cta-gradient rounded-card px-6 py-12 text-center text-white">
          <h2 className="font-heading text-h2 nav:text-h2-lg font-bold">
            Ready to build something extraordinary together?
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="onGradient">
              Start a Project →
            </Button>
            <Button href="/services" variant="ghostOnGradient">
              View Services
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
