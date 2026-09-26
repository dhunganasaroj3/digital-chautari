import { FEATURES } from "@/lib/data/home";
import { toIcon } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function FeatureStrip() {
  return (
    <Section spacing="standard">
      <Reveal>
        <SectionHeading eyebrow="What sets us apart" title="Built different, on purpose" />
      </Reveal>
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
        {FEATURES.map((feature, i) => {
          const Icon = toIcon(feature.icon);
          return (
            <Card key={feature.title} reveal>
              <IconChip icon={Icon} tone={i} className="chip-scale" />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">
                {feature.title}
              </h3>
              <p className="text-small-lg text-text-muted nav:text-base mt-2">{feature.body}</p>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
