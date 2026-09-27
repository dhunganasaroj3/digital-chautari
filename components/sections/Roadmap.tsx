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
          {ROADMAP.milestones.map((milestone, i) => {
            // Conditional classes instead of odd:/even: variants — the aria-hidden
            // line span is also a child of the <ol>, which shifts nth-child parity,
            // and every dot span is its own <li>'s first child (always "odd").
            const left = i % 2 === 0;
            return (
              <li
                key={milestone.title}
                className={`nav:w-1/2 relative pb-8 pl-7 last:pb-0 ${
                  left ? "nav:pr-10 nav:text-right" : "nav:ml-auto nav:pl-10"
                }`}
              >
                <span
                  aria-hidden
                  className={`bg-dc-leaf-500 absolute top-1 left-0 size-3 rounded-full ${
                    // Only the left-side dot clears the mobile left-0; adding
                    // nav:left-auto to both sides would out-sort nav:-left-1.5.
                    left ? "nav:left-auto nav:-right-1.5" : "nav:-left-1.5"
                  }`}
                />
                <Badge>{milestone.year}</Badge>
                <Card className="mt-3 text-left">
                  <h3 className="font-heading text-h3 nav:text-h3-lg font-bold">
                    {milestone.title}
                  </h3>
                  <p className="text-small-lg text-text-muted mt-2">{milestone.body}</p>
                </Card>
              </li>
            );
          })}
        </ol>
      </StaggerGroup>
    </Section>
  );
}
