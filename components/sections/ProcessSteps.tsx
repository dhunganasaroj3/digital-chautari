import { PROCESS } from "@/lib/data/home";
import { toIcon } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function ProcessSteps() {
  return (
    <Section dark>
      <SectionHeading dark eyebrow="How we work" title={PROCESS.title} />
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
        {PROCESS.steps.map((step, i) => {
          const Icon = toIcon(step.icon);
          return (
            <Card key={step.title} reveal="scale">
              <div className="flex items-start justify-between gap-3">
                <IconChip icon={Icon} tone={i} className="chip-scale" />
                <span className="font-heading text-accent-gold text-3xl font-extrabold" aria-hidden>
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">{step.title}</h3>
              <p className="text-small-lg text-text-muted nav:text-base mt-2">{step.body}</p>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
