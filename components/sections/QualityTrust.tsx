import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { QUALITY } from "@/lib/data/about";
import { toIcon } from "@/lib/utils";

export function QualityTrust() {
  return (
    <Section dark>
      <Reveal>
        <SectionHeading dark eyebrow={QUALITY.eyebrow} title={QUALITY.title} />
      </Reveal>
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
        {QUALITY.items.map((item) => {
          const Icon = toIcon(item.icon);
          return (
            <Card key={item.title} reveal>
              <IconChip icon={Icon} tone="gold" className="chip-scale" />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">{item.title}</h3>
              <p className="text-small-lg text-text-muted mt-2">{item.body}</p>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
