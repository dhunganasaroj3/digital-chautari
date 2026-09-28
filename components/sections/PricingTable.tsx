import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { PRICING } from "@/lib/data/services";

export function PricingTable() {
  return (
    <Section id="pricing" className="scroll-mt-20">
      <SectionHeading eyebrow={PRICING.eyebrow} title={PRICING.title} />
      <StaggerGroup className="mt-10 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {PRICING.tiers.map((tier) => (
          <Card key={tier.name} reveal dark={tier.dark} className="relative flex h-full flex-col">
            {"badge" in tier && tier.badge ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{tier.badge}</Badge>
            ) : null}
            <h3 className="font-heading text-h3-lg font-bold">{tier.name}</h3>
            <p className="mt-3">
              <span className="font-heading text-3xl font-extrabold">{tier.price}</span>
              {tier.period ? <span className="text-text-muted"> {tier.period}</span> : null}
            </p>
            <ul className="mt-6 mb-6 flex flex-col gap-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckCircle2 className="text-action size-5 shrink-0" aria-hidden />
                  <span className="text-small-lg">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              href={tier.cta.href}
              variant={tier.dark ? "primary" : "ghost"}
              className="mt-auto"
            >
              {tier.cta.label}
            </Button>
          </Card>
        ))}
      </StaggerGroup>
    </Section>
  );
}
