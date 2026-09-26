import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link with the primary classes by default", () => {
    render(<Button href="/contact">Contact Us</Button>);
    const btn = screen.getByRole("link", { name: "Contact Us" });
    expect(btn).toHaveAttribute("href", "/contact");
    expect(btn.className).toContain("bg-action");
    expect(btn.className).toContain("rounded-btn");
    expect(btn.className).toContain("min-h-[44px]");
  });

  it("applies the ghost variant classes", () => {
    render(
      <Button href="/products" variant="ghost">
        View Products
      </Button>,
    );
    const btn = screen.getByRole("link", { name: "View Products" });
    expect(btn.className).toContain("border-border-default");
    expect(btn.className).toContain("bg-surface-card");
  });

  it("applies the pill variant radius", () => {
    render(
      <Button href="/x" variant="pill">
        Pill
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Pill" }).className).toContain("rounded-pill");
  });
});
