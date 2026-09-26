import { CheckCircle2 } from "lucide-react";
import { WHO_WE_ARE } from "@/lib/data/home";
import { toIcon } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function WhoWeAre() {
  return (
    <Section spacing="standard">
      <div className="nav:grid-cols-2 grid grid-cols-1 items-center gap-10">
        <div>
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="font-heading text-h2 nav:text-h2-lg mt-3 font-bold">
              {WHO_WE_ARE.title}
            </h2>
            {WHO_WE_ARE.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-lede text-text-muted nav:text-lede-lg mt-3"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {WHO_WE_ARE.checklist.map((item) => (
              <li key={item} className="text-small-lg flex items-center gap-2 font-medium">
                <CheckCircle2 className="text-action size-4 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href={WHO_WE_ARE.cta.href} variant="ghost">
              {WHO_WE_ARE.cta.label}
            </Button>
          </div>
        </div>
        <StaggerGroup className="grid grid-cols-2 gap-5">
          {WHO_WE_ARE.teasers.map((teaser, i) => {
            const Icon = toIcon(teaser.icon);
            return (
              <Card key={teaser.title} href={teaser.href} reveal className="h-full">
                <IconChip icon={Icon} tone={i} className="chip-scale" />
                <h3 className="font-heading text-h3 nav:text-h3-lg mt-3 font-bold">
                  {teaser.title}
                </h3>
              </Card>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
