import type { Metadata } from "next";
import { Package, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GradientText } from "@/components/ui/GradientText";
import { IconChip } from "@/components/ui/IconChip";
import { Badge } from "@/components/ui/Badge";
import { PillTag } from "@/components/ui/PillTag";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatBar } from "@/components/ui/StatBar";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const PRIMITIVES = [
  "color-dc-teal-500",
  "color-dc-teal-600",
  "color-dc-gold-500",
  "color-dc-gold-600",
  "color-dc-leaf-500",
  "color-dc-ink-900",
  "color-dc-navy-900",
  "color-dc-navy-800",
  "color-dc-navy-700",
  "color-dc-paper-50",
  "color-dc-line-200",
  "color-dc-muted-500",
  "color-dc-mint-100",
  "color-dc-palteal-100",
  "color-dc-palgold-100",
  "color-dc-pallilac-100",
  "color-dc-palpink-100",
  "color-dc-action-600",
] as const;

const SEMANTIC = [
  { name: "surface", cssVar: "color-surface" },
  { name: "surface-card", cssVar: "color-surface-card" },
  { name: "text-primary", cssVar: "color-text-primary" },
  { name: "text-muted", cssVar: "color-text-muted" },
  { name: "border-default", cssVar: "color-border-default" },
  { name: "action", cssVar: "color-action" },
  { name: "accent-gold", cssVar: "color-accent-gold" },
  { name: "accent-leaf", cssVar: "color-accent-leaf" },
] as const;

const TYPE_ROWS = [
  { label: "H1 32 → 46 · 800", className: "font-heading text-h1 font-extrabold nav:text-h1-lg" },
  { label: "H2 28 → 30 · 700", className: "font-heading text-h2 font-bold nav:text-h2-lg" },
  { label: "H3 16 → 17 · 600", className: "font-heading text-h3 font-semibold nav:text-h3-lg" },
  { label: "Lede 15 → 17 · 400", className: "text-lede nav:text-lede-lg" },
  { label: "Small 12 → 13 · 500", className: "text-small font-medium nav:text-small-lg" },
  { label: "Button 14 → 15 · 600", className: "text-btn font-semibold nav:text-btn-lg" },
  {
    label: "Eyebrow 11 → 13 · 600",
    className: "text-eyebrow font-semibold uppercase tracking-eyebrow nav:text-eyebrow-lg",
  },
] as const;

const DEMO_STATS = [
  { icon: Package, value: "3", label: "Products" },
  { icon: Sparkles, value: "7+", label: "Team Members" },
  { icon: Package, value: "100%", label: "Commitment" },
];

function SectionTitle({ children }: { children: string }) {
  return <h2 className="font-heading text-h2 font-bold">{children}</h2>;
}

function Swatches({ tokens }: { tokens: readonly { name: string; cssVar: string }[] }) {
  return (
    <div className="nav:grid-cols-4 mt-6 grid grid-cols-2 gap-4 lg:grid-cols-6">
      {tokens.map((t) => (
        <div key={t.name}>
          <div
            className="rounded-card border-border-default h-16 border"
            style={{ backgroundColor: `var(--${t.cssVar})` }}
          />
          <p className="text-small text-text-muted mt-1">{t.name}</p>
        </div>
      ))}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="container-dc section-standard flex flex-col gap-12">
      <header>
        <h1 className="font-heading text-h1 nav:text-h1-lg font-extrabold">Styleguide</h1>
        <p className="text-small text-text-muted mt-2">
          Internal review page — not indexed. Token system, type scale, primitives, motion demo.
        </p>
      </header>

      <section>
        <SectionTitle>1 · Primitives (Layer 1)</SectionTitle>
        <Swatches
          tokens={PRIMITIVES.map((cssVar) => ({ name: cssVar.replace("color-", ""), cssVar }))}
        />
      </section>

      <section>
        <SectionTitle>2 · Semantic (Layer 2) — light, then dark remap</SectionTitle>
        <div className="rounded-card border-border-default border p-5">
          <Swatches tokens={SEMANTIC} />
        </div>
        <div data-scheme="dark" className="rounded-card bg-surface mt-4 p-5">
          <p className="text-small text-text-muted">data-scheme=&quot;dark&quot; strip:</p>
          <Swatches tokens={SEMANTIC} />
        </div>
      </section>

      <section>
        <SectionTitle>3 · Type scale</SectionTitle>
        <div className="mt-6 flex flex-col gap-4">
          {TYPE_ROWS.map((row) => (
            <div key={row.label} className="border-border-default border-b pb-4">
              <span className={`${row.className} block`}>Digital Chautari — Aa</span>
              <span className="text-small text-text-muted">{row.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>4 · Primitives (components)</SectionTitle>
        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Eyebrow light</Eyebrow>
            <Badge>Badge</Badge>
            <PillTag>PillTag</PillTag>
            <GradientText>
              <span className="font-heading text-h2 font-bold">Gradient on light</span>
            </GradientText>
          </div>
          <div
            data-scheme="dark"
            className="rounded-card bg-surface flex flex-wrap items-center gap-3 p-5"
          >
            <Eyebrow dark>Eyebrow dark</Eyebrow>
            <GradientText onDark>
              <span className="font-heading text-h2 font-bold">Gradient on dark</span>
            </GradientText>
            <Button href="/dev" variant="ghostDark">
              Ghost dark
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <IconChip key={i} icon={Package} tone={i} />
            ))}
            <IconChip icon={Sparkles} tone="gold" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/dev">Primary</Button>
            <Button href="/dev" variant="ghost">
              Ghost
            </Button>
            <Button href="/dev" variant="pill">
              Pill
            </Button>
          </div>
          <div className="nav:grid-cols-2 grid grid-cols-1 gap-5">
            <Card>
              <IconChip icon={Sparkles} tone={2} className="chip-scale" />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">Card sample</h3>
              <p className="text-small-lg text-text-muted mt-2">
                Hover me — chip scales 1.08, card lifts with shadow-card-hover.
              </p>
            </Card>
            <StatBar items={DEMO_STATS} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>5 · StaggerGroup reveal demo (scroll)</SectionTitle>
        <StaggerGroup className="nav:grid-cols-3 mt-6 grid grid-cols-1 gap-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Card key={i} reveal>
              <IconChip icon={Package} tone={i} />
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-4 font-bold">Demo {i + 1}</h3>
              <p className="text-small-lg text-text-muted mt-2">Staggers at 70ms, 0.45s ease.</p>
            </Card>
          ))}
        </StaggerGroup>
      </section>

      <section>
        <SectionTitle>6 · hero-bg utility</SectionTitle>
        <div className="hero-bg rounded-card border-border-default mt-6 border p-8">
          <p className="font-heading text-h2 font-bold">
            Mint → paper with radial glows (top right)
          </p>
        </div>
      </section>
    </div>
  );
}
