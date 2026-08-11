import Image from "next/image";
import Link from "next/link";
import type { Moment } from "@/lib/cms-types";
import { formatCalendarDate } from "@/lib/utils";

export function MomentCard({
  moment,
  preload = false,
}: {
  moment: Moment;
  preload?: boolean;
}) {
  const image = moment.images[0];

  return (
    <article className="border-b border-olive-900/15 last:border-b-0">
      <Link
        href={`/moments/${moment.slug}`}
        className={`group grid gap-6 py-8 sm:py-10 ${
          image
            ? "sm:grid-cols-[13rem_minmax(0,1fr)_auto] sm:items-center"
            : "sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        }`}
      >
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-olive-100">
            <Image
              src={image.url}
              alt={image.alt || moment.title}
              fill
              preload={preload}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
              sizes="(max-width: 640px) calc(100vw - 3rem), 208px"
            />
          </div>
        ) : null}

        <div className="max-w-2xl">
          <time className="stitch-label text-pimento-700">
            {formatCalendarDate(moment.moment_date)}
          </time>
          <h2 className="mt-2 font-serif text-3xl leading-[1.05] tracking-[-0.025em] text-olive-900 sm:text-4xl">
            {moment.title}
          </h2>
          {moment.excerpt ? (
            <p className="mt-3 text-lg leading-8 text-charcoal-700">
              {moment.excerpt}
            </p>
          ) : null}
          <p className="mt-4 font-semibold text-olive-700 sm:hidden">
            Read this moment →
          </p>
        </div>

        <span
          aria-hidden="true"
          className="hidden text-2xl text-olive-700 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none sm:block"
        >
          →
        </span>
      </Link>
    </article>
  );
}
