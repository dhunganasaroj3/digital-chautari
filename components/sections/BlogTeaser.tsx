import Link from "next/link";
import { POSTS } from "@/lib/data/home";
import { formatDate, chipTone, toIcon } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function BlogTeaser() {
  return (
    <Section spacing="standard">
      <Reveal>
        <SectionHeading eyebrow="Blog" title="Latest from our blog" />
      </Reveal>
      <StaggerGroup className="nav:grid-cols-2 mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {POSTS.map((post, i) => {
          const Icon = toIcon(
            post.category === "Content"
              ? "Clapperboard"
              : post.category === "Marketing"
                ? "TrendingUp"
                : "Code2",
          );
          return (
            <Card key={post.slug} reveal className="flex flex-col">
              <div
                aria-hidden
                className={`ratio-blog grid place-items-center rounded-lg ${chipTone(i)}`}
              >
                <Icon className="text-action/40 size-12" />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge>{post.category}</Badge>
                <span className="text-small text-text-muted">
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </div>
              <h3 className="font-heading text-h3 nav:text-h3-lg mt-3 font-bold">{post.title}</h3>
              <p className="text-small-lg text-text-muted nav:text-base mt-2 flex-1">
                {post.excerpt}
              </p>
              <Link
                href="/blog"
                className="text-small-lg text-action mt-4 inline-flex items-center gap-1 font-semibold hover:underline"
              >
                Read more <span aria-hidden>→</span>
              </Link>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
