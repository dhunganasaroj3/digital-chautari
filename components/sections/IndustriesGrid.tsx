import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { INDUSTRIES } from "@/lib/data/services";
import { toIcon } from "@/lib/utils";

export function IndustriesGrid() {
  return (
    <Section>
      <Reveal>
        <SectionHeading eyebrow={INDUSTRIES.eyebrow} title={INDUSTRIES.title} />
      </Reveal>
      <StaggerGroup className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
        {INDUSTRIES.items.map((item, i) => {
          const Icon = toIcon(item.icon);
          return (
            <Card key={item.title} reveal className="flex items-center gap-3">
              <IconChip icon={Icon} tone={i} />
              <h3 className="font-heading text-h3 nav:text-h3-lg font-semibold">{item.title}</h3>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
