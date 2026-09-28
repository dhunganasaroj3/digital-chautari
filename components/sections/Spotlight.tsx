import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProductMockup } from "@/components/sections/ProductMockup";
import { PHYSIO_SPOTLIGHT } from "@/lib/data/products";

export function Spotlight() {
  return (
    <Section dark>
      <SectionHeading dark eyebrow={PHYSIO_SPOTLIGHT.eyebrow} title={PHYSIO_SPOTLIGHT.title} />
      {/* mt-5 keeps the heading-to-paragraph ink gap at the site's ~26px
          rhythm now that the copy block top-aligns with the mockup card. */}
      <div className="nav:grid-cols-2 mt-5 grid grid-cols-1 items-start gap-10">
        <Reveal>
          <p className="text-col text-lede nav:text-lede-lg text-text-muted">
            {PHYSIO_SPOTLIGHT.body}
          </p>
          <Button href={PHYSIO_SPOTLIGHT.cta.href} className="mt-6">
            {PHYSIO_SPOTLIGHT.cta.label}
          </Button>
        </Reveal>
        {/* data-scheme="light": keep the mockup's paper styling inside the
            navy band — the booking-app visual the copy refers to. */}
        <Reveal>
          <div data-scheme="light">
            <ProductMockup variant="phone" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
