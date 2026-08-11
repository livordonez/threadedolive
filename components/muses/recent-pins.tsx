import Image from "next/image";
import type { Pin } from "@/lib/integrations/pinterest";

const pinLayouts = [
  "sm:col-span-4 sm:row-span-5",
  "sm:col-span-3 sm:row-span-3",
  "sm:col-span-5 sm:row-span-4",
  "sm:col-span-3 sm:row-span-4",
  "sm:col-span-4 sm:row-span-3",
  "sm:col-span-5 sm:row-span-5",
  "sm:col-span-4 sm:row-span-4",
  "sm:col-span-5 sm:row-span-3",
  "sm:col-span-3 sm:row-span-4",
] as const;

export function RecentPins({ pins }: { pins: Pin[] }) {
  return (
    <section aria-labelledby="recent-pins-title" className="border-t border-olive-900/15 pt-8 sm:pt-10">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-8 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-12">
        <header className="max-w-sm sm:sticky sm:top-28 sm:self-start">
          <p className="stitch-label text-pimento-700">On the pinboard</p>
          <h2 id="recent-pins-title" className="mt-3 font-serif text-4xl tracking-[-0.04em] text-olive-900 sm:text-5xl">
            Recent pins
          </h2>
          <p className="mt-4 text-lg leading-8 text-charcoal-700">
            Colors, shapes, clothes, rooms, and small details I want to remember.
          </p>
          <a
            href="https://www.pinterest.com/liv_ordonez/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
          >
            More on Pinterest <span aria-hidden="true">&nbsp;↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </header>

        {pins.length ? (
          <div className="grid auto-rows-[4.5rem] grid-cols-2 gap-3 sm:auto-rows-[3.35rem] sm:grid-cols-12 sm:gap-4 lg:auto-rows-[4rem]">
            {pins.map((pin, index) => (
              <a
                key={`${pin.sourceUrl}-${index}`}
                href={pin.sourceUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${pin.title || pin.alt} on Pinterest (opens in a new tab)`}
                className={`group relative min-h-0 overflow-hidden bg-olive-100 focus-visible:z-10 ${
                  index % 3 === 0 ? "row-span-4" : index % 3 === 1 ? "row-span-3" : "row-span-5"
                } ${pinLayouts[index % pinLayouts.length]}`}
              >
                <Image
                  src={pin.image}
                  alt={pin.alt}
                  fill
                  preload={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 24vw"
                />
              </a>
            ))}
          </div>
        ) : (
          <div className="grid min-h-64 place-items-center border-y border-olive-900/15 px-6 py-12 text-center">
            <p className="max-w-md font-serif text-2xl leading-snug text-olive-900">
              Nothing pinned here just now. There’s more over on Pinterest.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
