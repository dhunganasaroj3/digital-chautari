import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { WHY_US } from "@/lib/data/services";

export function WhyWorkWithUs() {
  return (
    <Section dark>
      <SectionHeading dark center eyebrow={WHY_US.eyebrow} title={WHY_US.title} />
      {/* Centered block keeps the navy stack on one axis with the CTA below;
          items stay left-aligned inside for scannability. */}
      <StaggerGroup className="nav:grid-cols-2 mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 text-left">
        {WHY_US.items.map((item) => (
          <div key={item} data-reveal className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-gold size-5 shrink-0" aria-hidden />
            <p className="text-lede nav:text-lede-lg">{item}</p>
          </div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
