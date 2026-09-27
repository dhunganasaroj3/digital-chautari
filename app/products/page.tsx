import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TabbedProducts } from "@/components/sections/TabbedProducts";
import { Spotlight } from "@/components/sections/Spotlight";
import { PRODUCTS_HERO } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Three ventures, one vision: Eco Creative Marketing Agency, One Content Creation Studio, and Physio@Home.",
};

export default function ProductsPage() {
  return (
    <>
      <Hero {...PRODUCTS_HERO} />
      <Suspense fallback={null}>
        <TabbedProducts />
      </Suspense>
      <Spotlight />
    </>
  );
}
