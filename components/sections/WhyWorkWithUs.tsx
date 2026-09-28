import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { WHY_US } from "@/lib/data/services";

export function WhyWorkWithUs() {
  return (
    <Section dark>
      <SectionHeading dark eyebrow={WHY_US.eyebrow} title={WHY_US.title} />
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-4">
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
