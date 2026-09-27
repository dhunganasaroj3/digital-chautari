import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Hero
      eyebrow="404"
      title="This chautari doesn't exist"
      gradient=""
      lede="The page you're looking for has wandered off the trail."
    >
      <div className="flex flex-wrap gap-4">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="ghost">
          Contact us
        </Button>
      </div>
    </Hero>
  );
}
