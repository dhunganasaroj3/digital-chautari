import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { ROADMAP } from "@/lib/data/about";

export function Roadmap() {
  return (
    <Section dark>
      <Reveal>
        <SectionHeading dark eyebrow={ROADMAP.eyebrow} title={ROADMAP.title} />
      </Reveal>
      <StaggerGroup className="mt-10">
        <ol className="relative mx-auto max-w-2xl">
          <span
            aria-hidden
            className="bg-border-default nav:left-1/2 absolute inset-y-0 left-1.5 w-px"
          />
          {ROADMAP.milestones.map((milestone) => (
            <li
              key={milestone.title}
              className="nav:w-1/2 nav:pl-0 nav:even:ml-auto nav:even:pl-10 nav:odd:pr-10 nav:odd:text-right relative pb-8 pl-7 last:pb-0"
            >
              <span
                aria-hidden
                className="bg-dc-leaf-500 nav:left-auto nav:even:-left-1.5 nav:odd:-right-1.5 absolute top-1 left-0 size-3 rounded-full"
              />
              <Badge>{milestone.year}</Badge>
              <Card className="mt-3 text-left">
                <h3 className="font-heading text-h3 nav:text-h3-lg font-bold">{milestone.title}</h3>
                <p className="text-small-lg text-text-muted mt-2">{milestone.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </StaggerGroup>
    </Section>
  );
}
