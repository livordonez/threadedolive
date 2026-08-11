import Image from "next/image";
import { BrandMotif } from "@/components/brand-motif";
import { ExternalLinkIcon } from "@/components/ui-icons";
import type { ReadingBook } from "@/lib/integrations/goodreads";

function displayDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

export function CurrentlyReading({ books }: { books: ReadingBook[] }) {
  return (
    <section aria-labelledby="currently-reading-title" className="border-t border-olive-900/15 pt-8 sm:pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-12">
        <header className="max-w-sm">
          <p className="stitch-label text-pimento-700">Reading lately</p>
          <h2 id="currently-reading-title" className="mt-3 font-serif text-4xl tracking-[-0.04em] text-olive-900 sm:text-5xl">
            On my nightstand
          </h2>
          <p className="mt-4 text-lg leading-8 text-charcoal-700">
            What I’m reading right now.
          </p>
          <BrandMotif motif="cat" className="-ml-10 -mt-3 w-40" />
        </header>

        {books.length ? (
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {books.map((book) => {
              const date = displayDate(book.dateStarted);
              return (
                <article key={book.goodreadsUrl} className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-5 sm:grid-cols-1">
                  {book.cover ? (
                    <a
                      href={book.goodreadsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="relative aspect-[2/3] overflow-hidden bg-olive-100 sm:w-44"
                      aria-label={`${book.title} on Goodreads (opens in a new tab)`}
                    >
                      <Image
                        src={book.cover}
                        alt={`Cover of ${book.title} by ${book.author}`}
                        fill
                        className="object-contain"
                        sizes="176px"
                      />
                    </a>
                  ) : (
                    <div className="aspect-[2/3] bg-olive-100 sm:w-44" aria-hidden="true" />
                  )}
                  <div className="border-t border-olive-900/15 pt-4">
                    {date ? <p className="stitch-label text-pimento-700">Started {date}</p> : null}
                    <h3 className="mt-2 font-serif text-3xl leading-[1.05] tracking-[-0.025em] text-olive-900">
                      {book.title}
                    </h3>
                    <p className="mt-2 text-base italic text-charcoal-700">by {book.author}</p>
                    <a
                      href={book.goodreadsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center font-semibold text-olive-700 underline decoration-olive-700/30 underline-offset-4"
                    >
                      <span className="inline-flex items-center gap-1.5">See on Goodreads <ExternalLinkIcon /></span>
                      <span className="sr-only"> on Goodreads (opens in a new tab)</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border-y border-olive-900/15 py-10">
            <p className="max-w-xl font-serif text-3xl leading-snug tracking-[-0.025em] text-olive-900">
              Nothing on the nightstand just now.
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-charcoal-700">
              The next book will show up when I start reading it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
