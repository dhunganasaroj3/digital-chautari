import { DARK_STATS } from "@/lib/data/home";
import { toIcon } from "@/lib/utils";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function DarkStatsBanner() {
  return (
    <Section dark>
      <Reveal>
        <SectionHeading dark eyebrow="Proof in numbers" title="Results we stand behind" />
      </Reveal>
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
        {DARK_STATS.map((stat) => {
          const Icon = toIcon(stat.icon);
          return (
            <div
              key={stat.label}
              data-reveal
              className="rounded-card border-border-default bg-surface-card flex items-center gap-3 border p-5"
            >
              <IconChip icon={Icon} tone="gold" />
              <div>
                <p className="font-heading text-2xl font-extrabold">{stat.value}</p>
                <p className="text-small-lg text-text-muted">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
