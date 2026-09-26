import { SECTORS } from "@/lib/data/home";
import { toIcon } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function SectorsGrid() {
  return (
    <Section spacing="standard">
      <Reveal>
        <SectionHeading eyebrow="Sectors" title="Sectors we serve" />
      </Reveal>
      <StaggerGroup className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
        {SECTORS.map((sector, i) => {
          const Icon = toIcon(sector.icon);
          return (
            <Card key={sector.title} reveal>
              <IconChip icon={Icon} tone={i} className="chip-scale" />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">{sector.title}</h3>
              <p className="text-small-lg text-text-muted nav:text-base mt-2">{sector.body}</p>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
