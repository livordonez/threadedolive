import Link from "next/link";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Pill } from "@/components/pill";
import type { JournalSummary } from "@/lib/types";
import { formatLongDate } from "@/lib/utils";

export function JournalCard({
  post,
}: {
  post: JournalSummary;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-olive-900/10 bg-white/85 shadow-[0_20px_50px_rgba(37,33,29,0.06)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
      <Link href={`/journal/${post.slug}`} className="flex h-full flex-col">
        <MediaPlaceholder image={post.featuredImage} aspect="landscape" />
        <div className="flex h-full flex-col gap-5 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="linen">{post.category}</Pill>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal-700">
              {formatLongDate(post.publishedOn)}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif text-3xl leading-none tracking-[-0.04em] text-olive-900">
              {post.title}
            </h3>
            <p className="text-sm leading-7 text-charcoal-700">
              {post.excerpt}
            </p>
          </div>
          <span className="mt-auto text-sm font-semibold uppercase tracking-[0.18em] text-olive-900">
            Read entry
          </span>
        </div>
      </Link>
    </article>
  );
}
