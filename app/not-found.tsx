import { LinkButton } from "@/components/link-button";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center sm:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pimento-700">
        Lost in the studio
      </p>
      <h1 className="font-serif text-5xl tracking-[-0.05em] text-olive-900 sm:text-7xl">
        This page slipped off the needle.
      </h1>
      <p className="max-w-2xl text-lg leading-9 text-charcoal-700">
        The link may be outdated, or the content may not exist yet. The rest of
        Threaded Olive is still here and ready to explore.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <LinkButton href="/portfolio">Explore the portfolio</LinkButton>
        <LinkButton href="/journal" variant="outline">
          Read the journal
        </LinkButton>
      </div>
    </section>
  );
}
