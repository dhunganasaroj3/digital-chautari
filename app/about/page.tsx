import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { MissionVision } from "@/components/sections/MissionVision";
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
    </>
  );
}
