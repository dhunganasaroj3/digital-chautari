import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { BlogPostCard } from "@/components/sections/BlogPostCard";
import { POSTS } from "@/lib/data/home";
import { pageOpenGraph } from "@/lib/data/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on marketing, content, and engineering from the Digital Chautari team.",
  openGraph: pageOpenGraph("Blog"),
};

export default function BlogPage() {
  return (
    <>
      <section className="section-hero relative">
        <div aria-hidden className="hero-bg pointer-events-none absolute inset-0" />
        <div className="container-dc relative">
          <div className="text-col">
            <Eyebrow>Blog</Eyebrow>
            <h2 className="font-heading text-h2 nav:text-h2-lg mt-4 font-extrabold">
              Latest from our blog
            </h2>
          </div>
        </div>
      </section>

      <Section spacing="standard">
        <div className="container-dc">
          <StaggerGroup className="nav:grid-cols-2 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {POSTS.map((post, i) => (
              <BlogPostCard key={post.slug} post={post} i={i} href="#" />
            ))}
          </StaggerGroup>
        </div>
      </Section>
    </>
  );
}
