import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FrayedEdge } from "@/components/textile-details";
import type { CmsImage, Moment } from "@/lib/cms-types";
import { formatCalendarDate } from "@/lib/utils";

function imageAspect(image: CmsImage): CSSProperties | undefined {
  if (!image.width || !image.height) return undefined;

  return { aspectRatio: `${image.width} / ${image.height}` };
}

export function MomentStory({
  moment,
  isPreview = false,
}: {
  moment: Moment;
  isPreview?: boolean;
}) {
  const [mainImage, ...gallery] = moment.images;

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
      {isPreview ? (
        <p
          role="status"
          className="mb-6 rounded-xl bg-brass-100 px-4 py-3 font-semibold text-olive-900"
        >
          Private draft preview
        </p>
      ) : null}

      <Link
        href="/moments"
        className="stitch-label text-olive-700 underline decoration-olive-700/25 underline-offset-4"
      >
        ← Back to Moments
      </Link>

      <header className="mt-9 grid gap-5 border-b border-olive-900/15 pb-10 sm:pb-12 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-12">
        <div className="lg:pt-2">
          <p className="stitch-label text-pimento-700">From the day</p>
          <time
            dateTime={moment.moment_date}
            className="mt-2 block font-serif text-lg leading-6 text-charcoal-700"
          >
            {formatCalendarDate(moment.moment_date)}
          </time>
        </div>

        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] text-olive-900 sm:text-7xl lg:text-[5rem] xl:text-[5.5rem]">
            {moment.title}
          </h1>
          {moment.excerpt ? (
            <FrayedEdge className="mt-8 max-w-2xl px-4 py-3 text-xl italic leading-8 text-charcoal-700 sm:text-2xl sm:leading-9">
              {moment.excerpt}
            </FrayedEdge>
          ) : null}
        </div>
      </header>

      {mainImage ? (
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-olive-100 sm:mt-12">
          <Image
            src={mainImage.url}
            alt={mainImage.alt || moment.title}
            fill
            preload
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1184px"
          />
        </div>
      ) : null}

      {moment.body ? (
        <section className="mt-12 grid gap-5 border-t border-olive-900/15 pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="stitch-label text-pimento-700">In the journal</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.025em] text-olive-900">
              A moment kept
            </h2>
          </div>
          <div className="public-prose whitespace-pre-line">
            {moment.body}
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section
          aria-labelledby="moment-gallery-heading"
          className="mt-14 border-t border-olive-900/15 pt-10 sm:mt-16 sm:pt-12"
        >
          <p className="stitch-label text-pimento-700">A few more frames</p>
          <h2
            id="moment-gallery-heading"
            className="mt-2 font-serif text-4xl tracking-[-0.03em] text-olive-900"
          >
            From this day
          </h2>
          <div className="mt-8 grid items-start gap-5 sm:grid-cols-2">
            {gallery.map((image) => (
              <div
                key={image.path}
                className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-olive-100"
                style={imageAspect(image)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) calc(100vw - 3rem), 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="mt-14 border-t border-olive-900/15 pt-8 sm:mt-16">
        <Link
          href="/moments"
          className="font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
        >
          ← Return to all Moments
        </Link>
      </footer>
    </article>
  );
}
