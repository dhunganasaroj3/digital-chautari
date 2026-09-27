import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { InfoTiles } from "@/components/sections/InfoTiles";
import { STORY } from "@/lib/data/about";

export function StoryBlock() {
  return (
    <Section>
      <div className="nav:grid-cols-2 grid grid-cols-1 items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={STORY.eyebrow} title={STORY.title} />
          {STORY.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lede text-text-muted nav:text-lede-lg mt-4">
              {paragraph}
            </p>
          ))}
        </Reveal>
        <InfoTiles />
      </div>
    </Section>
  );
}
