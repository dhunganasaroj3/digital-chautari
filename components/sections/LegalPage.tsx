import { Section } from "@/components/ui/Section";

/** Prose-lite skeleton shared by the privacy and terms pages. */
export function LegalPage({
  title,
  updated,
  paragraphs,
}: {
  title: string;
  updated: string;
  paragraphs: string[];
}) {
  return (
    <Section spacing="standard">
      <div className="container-dc">
        <div className="text-col">
          <h1 className="font-heading text-h1 nav:text-h1-lg font-extrabold">{title}</h1>
          <p className="text-small text-text-muted mt-2">Effective {updated}</p>
          <div className="mt-6 flex flex-col gap-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lede text-text-muted nav:text-lede-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
