import { Eyebrow } from "@/components/ui/Eyebrow";

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  center = false,
  className = "",
}: Props) {
  return (
    <div className={center ? `text-col mx-auto text-center ${className}` : className}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className="font-heading text-h2 nav:text-h2-lg mt-3 font-bold">{title}</h2>
      {lede ? (
        <p className="text-col text-lede text-text-muted nav:text-lede-lg mt-3">{lede}</p>
      ) : null}
    </div>
  );
}
