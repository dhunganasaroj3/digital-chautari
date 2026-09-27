import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CONTACT_HERO, INFO_CARDS, DIRECT_LINES, RESPONSE_TIMES } from "@/lib/data/contact";
import { toIcon } from "@/lib/utils";
import { pageOpenGraph } from "@/lib/data/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Digital Chautari — we reply to email within 24 hours.",
  openGraph: pageOpenGraph("Contact"),
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow={CONTACT_HERO.eyebrow}
        title={CONTACT_HERO.title}
        gradient={CONTACT_HERO.gradient}
        lede={CONTACT_HERO.lede}
      />

      <Section spacing="tight">
        <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {INFO_CARDS.map((info, i) => {
            const Icon = toIcon(info.icon);
            return (
              <Card key={info.title} reveal>
                <IconChip icon={Icon} tone={i} />
                <h2 className="font-heading text-h3 nav:text-h3-lg mt-3 font-bold">{info.title}</h2>
                <p className="text-small-lg text-text-muted mt-1 break-words">{info.body}</p>
              </Card>
            );
          })}
        </StaggerGroup>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <SectionHeading eyebrow={DIRECT_LINES.eyebrow} title={DIRECT_LINES.title} />
        </Reveal>
        <StaggerGroup className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {DIRECT_LINES.items.map((line, i) => {
            const Icon = toIcon(line.icon);
            return (
              <Card key={line.title} reveal>
                <IconChip icon={Icon} tone={i} />
                <h3 className="font-heading text-h3 nav:text-h3-lg mt-3 font-bold">{line.title}</h3>
                <a
                  href={`mailto:${line.email}`}
                  className="text-small-lg text-action mt-1 inline-block font-semibold wrap-anywhere hover:underline"
                >
                  {line.email}
                </a>
              </Card>
            );
          })}
        </StaggerGroup>
      </Section>

      <Section spacing="standard">
        <div className="nav:grid-cols-2 grid grid-cols-1 items-start gap-8">
          <Card hover={false}>
            <ContactForm />
          </Card>
          <div className="flex flex-col gap-5">
            <MapPlaceholder />
            <Card dark hover={false}>
              <h3 className="font-heading text-h3 nav:text-h3-lg font-bold">Need quick answers?</h3>
              <Link
                href="/faq"
                className="text-small-lg text-accent-gold mt-2 inline-block font-semibold hover:underline"
              >
                Visit FAQ page <span aria-hidden>→</span>
              </Link>
            </Card>
            <Card hover={false}>
              <h3 className="font-heading text-h3 nav:text-h3-lg font-bold">
                {RESPONSE_TIMES.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {RESPONSE_TIMES.items.map((item) => {
                  const Icon = toIcon(item.icon);
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <Icon className="text-action size-5 shrink-0" aria-hidden />
                      <p className="text-small-lg">
                        <span className="font-semibold">{item.label}</span>
                        <span className="text-text-muted"> · {item.value}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
