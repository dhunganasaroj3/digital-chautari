import type { Metadata } from "next";
import { HERO } from "@/lib/data/home";
import { pageOpenGraph } from "@/lib/data/seo";
import { toIcon } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { StatBar } from "@/components/ui/StatBar";
import { Hero } from "@/components/sections/Hero";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { DarkStatsBanner } from "@/components/sections/DarkStatsBanner";
import { ProductsTeaser } from "@/components/sections/ProductsTeaser";
import { SectorsGrid } from "@/components/sections/SectorsGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  openGraph: pageOpenGraph("Digital Chautari"),
};

function HomeHero() {
  const stats = HERO.stats.map((stat) => ({ ...stat, icon: toIcon(stat.icon) }));
  return (
    <Hero eyebrow={HERO.eyebrow} title={HERO.title} gradient={HERO.gradient} lede={HERO.lede}>
      <div className="flex flex-wrap items-center gap-4">
        <Button href={HERO.primaryCta.href} variant="primary">
          {HERO.primaryCta.label}
        </Button>
        <Button href={HERO.ghostCta.href} variant="ghost">
          {HERO.ghostCta.label}
        </Button>
      </div>
      <div className="mt-10">
        <StatBar items={stats} />
      </div>
    </Hero>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeatureStrip />
      <WhoWeAre />
      <DarkStatsBanner />
      <ProductsTeaser />
      <SectorsGrid />
      <ProcessSteps />
      <Testimonials />
      <BlogTeaser />
      <ClosingCta />
    </>
  );
}
