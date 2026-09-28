import Link from "next/link";
import { PRODUCTS_TEASER } from "@/lib/data/home";
import { toIcon } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function ProductsTeaser() {
  return (
    <Section spacing="standard">
      <SectionHeading eyebrow="Our products" title={PRODUCTS_TEASER.title} />
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {PRODUCTS_TEASER.items.map((product, i) => {
          const Icon = toIcon(product.icon);
          return (
            <Card key={product.name} reveal>
              <IconChip icon={Icon} tone={i} className="chip-scale" />
              <p className="text-eyebrow tracking-eyebrow text-action nav:text-eyebrow-lg mt-4 font-semibold uppercase">
                {product.category}
              </p>
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-1 font-bold">{product.name}</h3>
              <p className="text-small-lg text-text-muted nav:text-base mt-2">{product.body}</p>
              <Link
                href={product.href}
                className="text-small-lg text-action mt-4 inline-flex items-center gap-1 font-semibold hover:underline"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
