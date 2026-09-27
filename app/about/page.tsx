import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { MissionVision } from "@/components/sections/MissionVision";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { QualityTrust } from "@/components/sections/QualityTrust";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Roadmap } from "@/components/sections/Roadmap";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ABOUT_CTA, ABOUT_HERO } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "The people behind Digital Chautari — our story, values, team, and roadmap from a chautari to a digital powerhouse.",
};

export default function AboutPage() {
  return (
    <>
      <Hero {...ABOUT_HERO} />
      <StoryBlock />
      <MissionVision />
      <ValuesGrid />
      <QualityTrust />
      <TeamGrid />
      <Roadmap />
      <ClosingCta variant="dark" {...ABOUT_CTA} />
    </>
  );
}
