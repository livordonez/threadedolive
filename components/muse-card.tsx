import Image from "next/image";
import type { CSSProperties } from "react";
import type { Muse } from "@/lib/cms-types";

function imageAspect(image: Muse["images"][number]): CSSProperties | undefined {
  if (!image.width || !image.height) return undefined;

  return { aspectRatio: `${image.width} / ${image.height}` };
}

export function MuseCard({ muse, preload = false }: { muse: Muse; preload?: boolean }) {
  const image = muse.images[0];

  return (
    <article
      className={`mb-12 break-inside-avoid ${image ? "" : "border-t border-olive-900/15 pt-5"}`}
    >
      {image ? (
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-olive-100"
          style={imageAspect(image)}
        >
          <Image
            src={image.url}
            alt={image.alt || muse.title}
            fill
            preload={preload}
            className="object-cover"
            sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 44vw, 30vw"
          />
        </div>
      ) : null}

      <div className={image ? "px-1 pt-5" : "px-1"}>
        {muse.category ? (
          <p className="stitch-label text-pimento-700">{muse.category}</p>
        ) : null}
        <h2 className="mt-2 font-serif text-3xl leading-[1.05] tracking-[-0.025em] text-olive-900">
          {muse.title}
        </h2>
        {muse.note ? (
          <p className="mt-3 whitespace-pre-line text-base leading-7 text-charcoal-700">
            {muse.note}
          </p>
        ) : null}
        {muse.source_url ? (
          <a
            href={muse.source_url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
          >
            {muse.source_name || "Visit source"}
            <span aria-hidden="true">&nbsp;↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
