import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { MissionVision } from "@/components/sections/MissionVision";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { QualityTrust } from "@/components/sections/QualityTrust";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Roadmap } from "@/components/sections/Roadmap";
import { ABOUT_HERO } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_HERO.lede,
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
    </>
  );
}
