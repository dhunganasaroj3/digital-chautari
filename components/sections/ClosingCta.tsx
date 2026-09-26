import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  /** gradient = teal→blue panel (home). dark = full-width navy section. */
  variant?: "gradient" | "dark";
  /** dark variant only: */
  eyebrow?: string;
  title?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function ClosingCta({ variant = "gradient", eyebrow, title, cta, secondaryCta }: Props) {
  if (variant === "dark") {
    return (
      <Section spacing="tight" dark>
        <Reveal>
          <div className="text-center">
            <Eyebrow tone="gold">{eyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 nav:text-h2-lg mt-4 font-bold">{title}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {cta ? (
                <Button href={cta.href} variant="primary">
                  {cta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="ghostDark">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Section>
    );
  }
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
