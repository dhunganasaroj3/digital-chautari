import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MISSION_VISION } from "@/lib/data/about";
import { toIcon } from "@/lib/utils";

export function MissionVision() {
  const items = [MISSION_VISION.mission, MISSION_VISION.vision];
  return (
    <Section spacing="tight">
      <StaggerGroup className="nav:grid-cols-2 grid grid-cols-1 gap-5">
        {items.map((item, i) => {
          const Icon = toIcon(item.icon);
          return (
            <Card key={item.title} reveal>
              <IconChip icon={Icon} tone={i} className="chip-scale" />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">{item.title}</h3>
              <p className="text-lede text-text-muted nav:text-lede-lg mt-2">{item.body}</p>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
