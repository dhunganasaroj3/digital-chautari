import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Parallax } from "@/components/motion/Parallax";
import { BlogPostCard } from "@/components/sections/BlogPostCard";
import { POSTS } from "@/lib/data/home";
import { pageOpenGraph } from "@/lib/data/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on marketing, content, and engineering from the Digital Chautari team.",
  openGraph: pageOpenGraph("Blog"),
};

/** Alternating scroll depth, mirroring the home testimonials treatment. */
const DEPTH = [0.045, -0.03, 0.045] as const;

export default function BlogPage() {
  return (
    <>
      <Hero
        eyebrow="Blog"
        title="Latest from our blog"
        gradient="blog"
        lede="Notes on marketing, content, and engineering from the Digital Chautari team."
      />
      <Section spacing="standard">
        <StaggerGroup className="nav:grid-cols-2 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Parallax key={post.slug} amount={DEPTH[i % DEPTH.length] ?? 0}>
              <BlogPostCard post={post} i={i} href="#" titleAs="h2" />
            </Parallax>
          ))}
        </StaggerGroup>
      </Section>
    </>
  );
}
