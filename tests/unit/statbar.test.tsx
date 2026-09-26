import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Package, Users, Target } from "lucide-react";
import { StatBar } from "@/components/ui/StatBar";

const ITEMS = [
  { icon: Package, value: "3", label: "Products" },
  { icon: Users, value: "7+", label: "Team Members" },
  { icon: Target, value: "100%", label: "Commitment" },
];

describe("StatBar", () => {
  it("renders one segment per item with value and label", () => {
    render(<StatBar items={ITEMS} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("7+")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Commitment")).toBeInTheDocument();
  });

  it("uses the spec 3-column desktop grid and 20px-grid sibling dividers", () => {
    render(<StatBar items={ITEMS} />);
    const grid = screen.getByText("Products").closest(".grid")!;
    expect(grid.className).toContain("nav:grid-cols-3");
    const segments = Array.from(grid.children) as HTMLElement[];
    expect(segments).toHaveLength(3);
    expect(segments[0]!.className).not.toContain("border-t");
    expect(segments[1]!.className).toContain("border-t");
    expect(segments[1]!.className).toContain("nav:border-l");
  });

  it("switches to 4 columns with 4 items (dark banner layout)", () => {
    const four = [...ITEMS, { icon: Users, value: "98%", label: "Client Retention" }];
    render(<StatBar items={four} />);
    const grid = screen.getByText("Client Retention").closest(".grid")!;
    expect(grid.className).toContain("nav:grid-cols-4");
  });
});
