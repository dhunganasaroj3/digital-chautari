import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { VALUES } from "@/lib/data/about";
import { toIcon } from "@/lib/utils";

export function ValuesGrid() {
  return (
    <Section spacing="tight">
      <StaggerGroup className="nav:grid-cols-2 grid grid-cols-1 gap-5 lg:grid-cols-4">
        {VALUES.map((value, i) => {
          const Icon = toIcon(value.icon);
          return (
            <Card key={value.title} reveal>
              <IconChip icon={Icon} tone={i} className="chip-scale" />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">{value.title}</h3>
              <p className="text-small-lg text-text-muted mt-2">{value.body}</p>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
