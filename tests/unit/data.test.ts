import { describe, expect, it } from "vitest";
import { CATEGORIES, PRICING } from "@/lib/data/services";
import { TEAM, ROADMAP } from "@/lib/data/about";
import { PRODUCTS } from "@/lib/data/products";

describe("services data integrity", () => {
  it("has 3 categories with exactly 4 subs each", () => {
    expect(CATEGORIES.length).toBe(3);
    for (const category of CATEGORIES) {
      expect(category.subs.length).toBe(4);
    }
  });

  it("has 3 pricing tiers with exact price strings and a badge on the middle tier", () => {
    expect(PRICING.tiers.length).toBe(3);
    expect(PRICING.tiers[0].price).toBe("Rs 15,000");
    expect(PRICING.tiers[1].price).toBe("Rs 45,000");
    expect(PRICING.tiers[2].price).toBe("Custom");
    expect("badge" in PRICING.tiers[1] && PRICING.tiers[1].badge).toBe("Most Popular");
    expect(PRICING.tiers[1].dark).toBe(true);
  });
});

describe("about data integrity", () => {
  it("has 7 team members with exact roles", () => {
    expect(TEAM.length).toBe(7);
    expect(TEAM.map((member) => member.role)).toEqual([
      "Founder & CEO",
      "Co-Founder & COO",
      "Front-End Developer",
      "Back-End Developer",
      "Marketing Lead",
      "Sales Executive",
      "Business Development Officer",
    ]);
  });

  it("has 4 roadmap milestones with the expected years", () => {
    expect(ROADMAP.milestones.length).toBe(4);
    expect(ROADMAP.milestones.map((milestone) => milestone.year)).toEqual([
      "2025",
      "2025",
      "2026",
      "2026",
    ]);
  });
});

describe("products data integrity", () => {
  it("has unique ids and exact Physio@Home casing", () => {
    const ids = PRODUCTS.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(PRODUCTS[2].name).toBe("Physio@Home");
    expect(PRODUCTS[2].tab).toBe("Physio@Home");
  });
});
