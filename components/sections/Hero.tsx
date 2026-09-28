import { HeroIntro } from "@/components/motion/HeroIntro";

/**
 * Server facade for the animated hero — markup and entrance timeline
 * live in the client HeroIntro primitive (motion spec v2).
 */
export function Hero(props: React.ComponentProps<typeof HeroIntro>) {
  return <HeroIntro {...props} />;
}
