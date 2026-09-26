import { Eyebrow } from "@/components/ui/Eyebrow";
import { GradientText } from "@/components/ui/GradientText";
import { splitGradient } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  /** Exact substring of `title` to wrap in the brand gradient. */
  gradient: string;
  lede: string;
  /** Slots below the lede — CTA buttons, stat bar. */
  children?: React.ReactNode;
  /** D-8 default is left-aligned; opt into centered heroes. */
  center?: boolean;
};

export function Hero({ eyebrow, title, gradient, lede, children, center = false }: Props) {
  const [before, after] = splitGradient(title, gradient);
  return (
    <section className="section-hero relative">
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0" />
      <div className="container-dc relative">
        <div className={`text-col ${center ? "mx-auto text-center" : ""}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-h1 nav:text-h1-lg mt-4 font-extrabold">
            {before}
            <GradientText>{gradient}</GradientText>
            {after}
          </h1>
          <p className="text-lede text-text-muted nav:text-lede-lg mt-4">{lede}</p>
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
