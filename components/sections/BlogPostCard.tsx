import { Clapperboard, Code2, TrendingUp } from "lucide-react";
import { formatDate, chipTone } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
};

/** Module level so no component is created during render. */
const CATEGORY_ICONS = { Content: Clapperboard, Marketing: TrendingUp } as const;

export function BlogPostCard({
  post,
  i,
  href,
  /** h3 under a section h2 (home teaser); the blog index promotes titles to h2 (axe heading-order). */
  titleAs = "h3",
  className = "",
}: {
  post: Post;
  i: number;
  href: string;
  titleAs?: "h2" | "h3";
  /** Extra classes on the Card root — "h-full" from grid parents keeps rows equal. */
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[post.category as keyof typeof CATEGORY_ICONS] ?? Code2;
  const TitleTag = titleAs;
  return (
    <Card href={href} reveal className={`flex h-full flex-col ${className}`}>
      <div aria-hidden className={`ratio-blog grid place-items-center rounded-lg ${chipTone(i)}`}>
        <Icon className="text-action/40 size-12" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge>{post.category}</Badge>
        <span className="text-small text-text-muted">
          {formatDate(post.date)} · {post.readTime}
        </span>
      </div>
      <TitleTag className="font-heading text-h3 nav:text-h3-lg mt-3 font-bold">
        {post.title}
      </TitleTag>
      <p className="text-small-lg text-text-muted nav:text-base mt-2 flex-1">{post.excerpt}</p>
      <span className="text-small-lg text-action mt-4 inline-flex items-center gap-1 font-semibold group-hover:underline">
        Read more <span aria-hidden>→</span>
      </span>
    </Card>
  );
}
