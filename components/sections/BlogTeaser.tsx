import { POSTS } from "@/lib/data/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { BlogPostCard } from "@/components/sections/BlogPostCard";

export function BlogTeaser() {
  return (
    <Section spacing="standard">
      <Reveal>
        <SectionHeading eyebrow="Blog" title="Latest from our blog" />
      </Reveal>
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {POSTS.map((post, i) => (
          <BlogPostCard key={post.slug} post={post} i={i} href="/blog" />
        ))}
      </StaggerGroup>
    </Section>
  );
}
