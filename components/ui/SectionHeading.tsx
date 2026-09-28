import { SectionIntro } from "@/components/motion/SectionIntro";

/**
 * Server facade for the animated section heading — markup and entrance
 * choreography live in the client SectionIntro primitive (motion spec v2).
 */
export function SectionHeading(props: React.ComponentProps<typeof SectionIntro>) {
  return <SectionIntro {...props} />;
}
