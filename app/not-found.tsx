import Link from "next/link";
import { LinkButton } from "@/components/link-button";
import { ArrowRightIcon } from "@/components/ui-icons";

const moreLinks = [
  ["Makes", "/makes"],
  ["Muses", "/muses"],
  ["Moments", "/moments"],
] as const;

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[38rem] lg:px-12 lg:py-28">
      <div className="max-w-3xl">
        <p className="stitch-label text-pimento-700">Lost in the studio · 404</p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.96] tracking-[-0.045em] text-olive-900 sm:text-7xl">
          This page slipped off the needle.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal-700 sm:text-xl sm:leading-9">
          The link may be old, but there’s plenty more to look through.
        </p>

        <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
          <LinkButton href="/">Return home</LinkButton>
          <nav aria-label="More from The Threaded Olive">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {moreLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
                  >
                    <span className="inline-flex items-center gap-1.5">{label} <ArrowRightIcon /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

    </section>
  );
}
