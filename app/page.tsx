import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { LaceOverlay, ScallopedEdge } from "@/components/textile-details";
import { getAbout, getPublishedMakes, getSettings } from "@/lib/cms-data";

const pillars = [
  ["Makes", "/makes", "What I’ve made"],
  ["Muses", "/muses", "What is inspiring me"],
  ["Moments", "/moments", "Notes from my days"],
] as const;

export default async function HomePage() {
  const [settings, about, makes] = await Promise.all([
    getSettings(),
    getAbout(),
    getPublishedMakes(),
  ]);
  const featured = makes.slice(0, 5);

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:px-10 lg:px-12 lg:pb-20 lg:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <header className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-pimento-700">
              A handmade archive
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.055em] text-olive-900 sm:text-7xl">
              Made by hand,
              <br />
              <em className="font-normal">kept with care.</em>
            </h1>
            {settings.short_description ? (
              <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal-700">
                {settings.short_description}
              </p>
            ) : null}
          </header>
          <div className="relative mx-auto w-full max-w-xl py-2 lg:justify-self-end" aria-hidden="true">
            <div className="absolute inset-x-[12%] bottom-[8%] h-1/2 rounded-full bg-brass-100/65 blur-3xl" />
            <BrandMark className="relative h-auto w-full" />
          </div>
        </div>

        <section
          aria-label="Recent makes"
          className={`mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 ${featured.length ? "lg:grid-rows-2" : ""}`}
        >
          {featured.map((make, index) => {
            const image = make.images[0];
            const size = index === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5";
            return (
              <Link
                key={make.id}
                href={`/makes/${make.slug}`}
                className={`group relative min-h-72 overflow-hidden rounded-[1.5rem] bg-olive-100 ${size}`}
              >
                {image ? (
                  <Image
                    src={image.url}
                    alt={image.alt || make.title}
                    fill
                    priority={index < 2}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
                    sizes={index === 0 ? "(max-width:1024px) 100vw, 58vw" : "(max-width:1024px) 100vw, 42vw"}
                  />
                ) : (
                  <div className={`${index % 2 ? "mustard-textile" : "bright-textile-placeholder"} absolute inset-0`} />
                )}
                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-linen-0/90 px-4 py-3 backdrop-blur-sm">
                  <p className="font-serif text-2xl text-olive-900">{make.title}</p>
                </div>
              </Link>
            );
          })}
          {!featured.length ? (
            <div className="bright-textile-placeholder relative col-span-full grid min-h-[30rem] place-items-center overflow-hidden rounded-[1.5rem]">
              <p className="rounded-full bg-linen-0/90 px-6 py-4 font-serif text-2xl text-olive-900">
                Photography will gather here as makes are published.
              </p>
            </div>
          ) : null}
        </section>
      </section>

      <ScallopedEdge className="bg-olive-100" />
      <section className="relative bg-olive-100 px-6 py-16 sm:px-10 lg:py-20">
        <div className="relative isolate mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-sm">
            <LaceOverlay className="-right-8 -top-8" />
            {about.images[0] ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[45%_45%_1.5rem_1.5rem]">
                <Image src={about.images[0].url} alt={about.images[0].alt} fill className="object-cover" sizes="400px" />
              </div>
            ) : (
              <div className="cream-ticking-textile aspect-[4/5] rounded-[45%_45%_1.5rem_1.5rem]" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pimento-700">Meet the maker</p>
            <h2 className="mt-3 font-serif text-5xl tracking-[-0.05em] text-olive-900 sm:text-6xl">Hi, I’m Olivia.</h2>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-9 text-charcoal-700">
              {about.bio || "Threaded Olive is where I keep the projects, ideas, and everyday moments that shape my creative life."}
            </p>
            <Link href="/about" className="mt-6 inline-block text-sm font-bold text-olive-700 underline decoration-olive-700/30 underline-offset-4">
              More about me →
            </Link>
          </div>
        </div>
      </section>
      <ScallopedEdge flip className="bg-olive-100" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="border-y border-olive-900/15">
          {pillars.map(([title, href, description]) => (
            <Link key={href} href={href} className="grid gap-2 border-b border-olive-900/15 py-7 last:border-0 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline">
              <h2 className="font-serif text-4xl tracking-[-0.04em] text-olive-900">{title}</h2>
              <p className="text-charcoal-700">{description}</p>
              <span className="text-sm font-bold text-olive-700">Explore →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
