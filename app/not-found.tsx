import Link from "next/link";
import { LinkButton } from "@/components/link-button";
import { StitchMotif } from "@/components/stitch-motif";
import { PinkedEdge } from "@/components/textile-details";

const archiveLinks = [
  ["Makes", "/makes"],
  ["Muses", "/muses"],
  ["Moments", "/moments"],
] as const;

export default function NotFound() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[38rem] lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center lg:gap-16 lg:px-12">
      <div className="max-w-3xl">
        <p className="stitch-label text-pimento-700">Lost in the studio · 404</p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.96] tracking-[-0.045em] text-olive-900 sm:text-7xl">
          This page slipped off the needle.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal-700 sm:text-xl sm:leading-9">
          The link may be outdated, but the rest of Threaded Olive is still
          here to explore.
        </p>

        <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
          <LinkButton href="/">Return home</LinkButton>
          <nav aria-label="Explore the archives">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {archiveLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
                  >
                    {label} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className="justify-self-center lg:justify-self-end"
        aria-hidden="true"
      >
        <PinkedEdge className="mustard-textile grid aspect-square w-36 place-items-center sm:w-44">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-linen-0/90 shadow-sm sm:h-24 sm:w-24">
            <StitchMotif
              motif="cat"
              className="h-12 w-12 text-olive-700 sm:h-14 sm:w-14"
            />
          </span>
        </PinkedEdge>
        <p className="stitch-label mt-3 text-center text-pimento-700">
          Mind the loose thread
        </p>
      </div>
    </section>
  );
}
