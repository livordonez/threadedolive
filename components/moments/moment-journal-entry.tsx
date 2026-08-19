import Image from "next/image";
import type { CSSProperties } from "react";
import { FrayedEdge } from "@/components/textile-details";
import type { CmsImage, Moment } from "@/lib/cms-types";
import { richTextHtml } from "@/lib/rich-text";
import { formatCalendarDate } from "@/lib/utils";

function imageAspect(image: CmsImage): CSSProperties | undefined {
  if (!image.width || !image.height) return undefined;
  return { aspectRatio: `${image.width} / ${image.height}` };
}

export function MomentJournalEntry({
  moment,
  preload = false,
}: {
  moment: Moment;
  preload?: boolean;
}) {
  const [mainImage, ...gallery] = moment.images;
  const bodyHtml = richTextHtml(moment.body);

  return (
    <article
      id={moment.slug}
      data-moment-slug={moment.slug}
      className="scroll-mt-36 border-b border-olive-900/15 px-5 py-10 last:border-b-0 sm:scroll-mt-28 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <header className="max-w-3xl pl-0 sm:pl-8">
        <time
          dateTime={moment.moment_date}
          className="stitch-label text-pimento-700"
        >
          {formatCalendarDate(moment.moment_date)}
        </time>
        <h2 className="journal-hand mt-3 text-4xl text-olive-900 sm:text-5xl lg:text-[3.35rem]">
          {moment.title}
        </h2>
        {moment.excerpt ? (
          <FrayedEdge className="mt-6 max-w-2xl px-4 py-3 text-lg italic leading-8 text-charcoal-700 sm:text-xl sm:leading-9">
            {moment.excerpt}
          </FrayedEdge>
        ) : null}
      </header>

      {mainImage ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-olive-100 sm:mt-10 sm:ml-8">
          <Image
            src={mainImage.url}
            alt={mainImage.alt || moment.title}
            fill
            preload={preload}
            className="object-cover"
            sizes="(max-width: 1024px) calc(100vw - 3rem), 48rem"
          />
        </div>
      ) : null}

      {bodyHtml ? (
        <div
          className="rich-text journal-hand mt-8 max-w-[var(--content-reading)] pl-0 sm:mt-10 sm:pl-8"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : null}

      {gallery.length ? (
        <div className="mt-8 grid items-start gap-4 pl-0 sm:mt-10 sm:grid-cols-2 sm:pl-8">
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
                sizes="(max-width: 640px) calc(100vw - 3rem), 22rem"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
