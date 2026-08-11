import Image from "next/image";
import { BrandMotif } from "@/components/brand-motif";
import type { FavoriteFollow } from "@/data/favorite-follows";

export function FavoriteFollows({ follows }: { follows: FavoriteFollow[] }) {
  return (
    <section aria-labelledby="favorite-follows-title" className="border-t border-olive-900/15 pt-8 sm:pt-10">
      <header className="relative max-w-3xl pr-0 sm:pr-28">
        <p className="stitch-label text-pimento-700">Around the internet</p>
        <h2 id="favorite-follows-title" className="mt-3 font-serif text-4xl tracking-[-0.04em] text-olive-900 sm:text-5xl">
          People I love following
        </h2>
        <p className="mt-4 text-lg leading-8 text-charcoal-700">
          People whose work keeps me looking, learning, and making.
        </p>
        <BrandMotif
          motif="martini"
          className="absolute -right-10 -top-9 hidden w-36 sm:block"
        />
      </header>

      <div className="mt-8 border-y border-olive-900/15">
        {follows.map((follow, index) => (
          <article
            key={follow.url}
            className="grid gap-5 border-b border-olive-900/15 py-7 last:border-b-0 sm:grid-cols-[auto_minmax(10rem,0.55fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-7"
          >
            <p className="stitch-label text-pimento-700" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-5">
              {follow.image ? (
                <div className="relative aspect-[4/5] w-20 flex-none overflow-hidden bg-olive-100">
                  <Image src={follow.image} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ) : null}
              <div>
                <h3 className="font-serif text-3xl leading-none tracking-[-0.025em] text-olive-900 sm:text-4xl">
                  {follow.name}
                </h3>
                <p className="mt-2 stitch-label text-charcoal-700">{follow.platform}</p>
              </div>
            </div>
            {follow.description ? (
              <p className="max-w-xl text-base leading-7 text-charcoal-700">{follow.description}</p>
            ) : (
              <span />
            )}
            <a
              href={follow.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-self-start font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4 sm:justify-self-end"
            >
              Have a look <span aria-hidden="true">&nbsp;↗</span>
              <span className="sr-only"> {follow.name} on {follow.platform} (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
