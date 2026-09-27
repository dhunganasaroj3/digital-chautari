import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { TEAM } from "@/lib/data/about";
import { chipTone, initials } from "@/lib/utils";

export function TeamGrid() {
  return (
    <Section id="team" className="scroll-mt-20">
      <StaggerGroup className="nav:grid-cols-3 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {TEAM.map((member, i) => (
          <Card key={member.name} reveal>
            <span
              className={`text-action font-heading grid size-12 place-items-center rounded-full font-bold ${chipTone(i)}`}
            >
              {initials(member.name)}
            </span>
            <h3 className="font-heading text-h3 nav:text-h3-lg mt-3 font-semibold">
              {member.name}
            </h3>
            <p className="text-small text-text-muted mt-1">{member.role}</p>
          </Card>
        ))}
      </StaggerGroup>
    </Section>
  );
}
