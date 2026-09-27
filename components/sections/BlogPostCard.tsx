import Link from "next/link";
import { formatDate, chipTone, toIcon } from "@/lib/utils";
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

export function BlogPostCard({ post, i, href }: { post: Post; i: number; href: string }) {
  const Icon = toIcon(
    post.category === "Content"
      ? "Clapperboard"
      : post.category === "Marketing"
        ? "TrendingUp"
        : "Code2",
  );
  return (
    <Card href={href} reveal className="flex flex-col">
      <div aria-hidden className={`ratio-blog grid place-items-center rounded-lg ${chipTone(i)}`}>
        <Icon className="text-action/40 size-12" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge>{post.category}</Badge>
        <span className="text-small text-text-muted">
          {formatDate(post.date)} · {post.readTime}
        </span>
      </div>
      <h3 className="font-heading text-h3 nav:text-h3-lg mt-3 font-bold">{post.title}</h3>
      <p className="text-small-lg text-text-muted nav:text-base mt-2 flex-1">{post.excerpt}</p>
      <Link
        href={href}
        className="text-small-lg text-action mt-4 inline-flex items-center gap-1 font-semibold hover:underline"
      >
        Read more <span aria-hidden>→</span>
      </Link>
    </Card>
  );
}
