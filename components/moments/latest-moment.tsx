import Image from "next/image";
import Link from "next/link";
import type { Moment } from "@/lib/cms-types";
import { formatCalendarDate } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui-icons";

export function LatestMoment({ moment }: { moment: Moment }) {
  const image = moment.images[0];

  return (
    <section aria-labelledby="latest-moment-title" className="mt-16 sm:mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-olive-900/15 pb-5">
        <div>
          <p className="stitch-label text-pimento-700">From my notebook</p>
          <h2
            id="latest-moment-title"
            className="mt-2 font-serif text-4xl tracking-[-0.04em] text-olive-900 sm:text-5xl"
          >
            A recent Moment
          </h2>
        </div>
        <Link
          href="/moments"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
        >
          All Moments <ArrowRightIcon />
        </Link>
      </div>

      <Link
        href={`/moments#${moment.slug}`}
        className={`group mt-8 grid gap-6 ${
          image
            ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center"
            : ""
        }`}
      >
        {image ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-olive-100">
            <Image
              src={image.url}
              alt={image.alt || moment.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>
        ) : null}

        <div className="max-w-xl">
          <time
            dateTime={moment.moment_date}
            className="stitch-label text-pimento-700"
          >
            {formatCalendarDate(moment.moment_date)}
          </time>
          <h3 className="journal-hand mt-3 text-4xl text-olive-900 sm:text-5xl">
            {moment.title}
          </h3>
          {moment.excerpt ? (
            <p className="mt-4 text-lg leading-8 text-charcoal-700">
              {moment.excerpt}
            </p>
          ) : null}
          <p className="mt-5 inline-flex items-center gap-1.5 font-semibold text-olive-700">
            Keep reading <ArrowRightIcon />
          </p>
        </div>
      </Link>
    </section>
  );
}
