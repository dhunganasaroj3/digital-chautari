import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { INDUSTRIES } from "@/lib/data/services";
import { toIcon } from "@/lib/utils";

export function IndustriesGrid() {
  return (
    <Section>
      <SectionHeading eyebrow={INDUSTRIES.eyebrow} title={INDUSTRIES.title} />
      {/* 1-col below nav: icon + label can't share a 2-col tile at 390px
          without wrapping "E-Commerce" mid-word. */}
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {INDUSTRIES.items.map((item, i) => {
          const Icon = toIcon(item.icon);
          return (
            <Card key={item.title} reveal="scale" className="flex items-center gap-3">
              <IconChip icon={Icon} tone={i} />
              <h3 className="font-heading text-h3 nav:text-h3-lg min-w-0 font-semibold">
                {item.title}
              </h3>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
