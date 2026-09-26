import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceCategoryRow } from "@/components/sections/ServiceCategoryRow";
import { PricingTable } from "@/components/sections/PricingTable";
import { CATEGORIES, SERVICES_HERO } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: SERVICES_HERO.lede,
};

export default function ServicesPage() {
  return (
    <>
      <Hero {...SERVICES_HERO} />
      {CATEGORIES.map((category, i) => (
        <ServiceCategoryRow key={category.id} category={category} flip={i % 2 === 1} />
      ))}
      <PricingTable />
    </>
  );
}
