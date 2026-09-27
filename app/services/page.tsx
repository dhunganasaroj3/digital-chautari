import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceCategoryRow } from "@/components/sections/ServiceCategoryRow";
import { PricingTable } from "@/components/sections/PricingTable";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { WhyWorkWithUs } from "@/components/sections/WhyWorkWithUs";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CATEGORIES, SERVICES_CTA, SERVICES_HERO } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, content creation, and software development — transparent pricing and agile delivery from Kathmandu.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero {...SERVICES_HERO} />
      {CATEGORIES.map((category, i) => (
        <ServiceCategoryRow key={category.id} category={category} flip={i % 2 === 1} />
      ))}
      <PricingTable />
      <IndustriesGrid />
      <WhyWorkWithUs />
      <ClosingCta variant="dark" {...SERVICES_CTA} />
    </>
  );
}
