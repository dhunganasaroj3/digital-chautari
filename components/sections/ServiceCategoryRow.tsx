import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { IconChip } from "@/components/ui/IconChip";
import { Card } from "@/components/ui/Card";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { toIcon } from "@/lib/utils";
import type { CATEGORIES } from "@/lib/data/services";

type Category = (typeof CATEGORIES)[number];

type Props = {
  category: Category;
  /** Rows alternate: odd rows put the text column on the right. */
  flip?: boolean;
};

export function ServiceCategoryRow({ category, flip = false }: Props) {
  const Icon = toIcon(category.icon);
  return (
    <Section id={category.id} className="scroll-mt-20">
      <div className="nav:grid-cols-2 grid grid-cols-1 items-center gap-10">
        <div className={flip ? "nav:order-2" : undefined}>
          <IconChip icon={Icon} />
          <h2 className="font-heading text-h2 nav:text-h2-lg mt-4 font-bold">{category.title}</h2>
          <p className="text-lede text-text-muted nav:text-lede-lg mt-3">{category.body}</p>
          <Link
            href="/contact"
            className="text-small-lg text-action mt-4 inline-flex items-center gap-1 font-semibold hover:underline"
          >
            Discuss this service <span aria-hidden>→</span>
          </Link>
        </div>
        <StaggerGroup className={`grid grid-cols-2 gap-5 ${flip ? "nav:order-1" : ""}`}>
          {category.subs.map((sub, i) => {
            const SubIcon = toIcon(sub.icon);
            return (
              <Card key={sub.title} reveal>
                <IconChip icon={SubIcon} tone={i} />
                <h3 className="font-heading text-h3 nav:text-h3-lg mt-3 font-semibold">
                  {sub.title}
                </h3>
              </Card>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
