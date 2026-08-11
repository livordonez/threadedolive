import { BrandMotif } from "@/components/brand-motif";
import { ResilientImage } from "@/components/resilient-image";
import { ExternalLinkIcon } from "@/components/ui-icons";
import type { CreatorCardData } from "@/lib/integrations/creators";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function CreatorAvatar({ creator, large = false }: { creator: CreatorCardData; large?: boolean }) {
  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-olive-100 font-serif text-2xl text-olive-700 ${
        large ? "h-28 w-28" : "h-20 w-20"
      }`}
      aria-hidden="true"
    >
      <span>{initials(creator.name)}</span>
      {creator.avatar ? (
        <ResilientImage
          src={creator.avatar}
          alt=""
          sizes={large ? "112px" : "80px"}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}

export function FavoriteFollows({ follows }: { follows: CreatorCardData[] }) {
  return (
    <section aria-labelledby="favorite-follows-title" className="border-t border-olive-900/15 pt-8 sm:pt-10">
      <header className="relative max-w-3xl pr-0 sm:pr-28">
        <p className="stitch-label text-pimento-700">Around the internet</p>
        <h2 id="favorite-follows-title" className="mt-3 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-olive-900 sm:text-5xl">
          My Favorite Follows
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-charcoal-700">
          People whose work keeps me looking, learning, and making.
        </p>
        <BrandMotif motif="martini" className="absolute -right-8 -top-8 hidden w-32 sm:block" />
      </header>

      <ul className="mt-9 grid gap-y-8">
        {follows.map((creator) => (
          <li key={creator.url}>
            <a
              href={creator.url}
              target="_blank"
              rel="noreferrer"
              className={`group block border-y border-olive-900/15 py-5 outline-offset-4 transition-colors hover:border-olive-700/45 active:bg-olive-50/50 motion-reduce:transition-none sm:py-6 ${
                creator.latestPost
                  ? "sm:grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-7"
                  : "max-w-3xl"
              }`}
            >
              {creator.latestPost ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-olive-100">
                  <ResilientImage
                    src={creator.latestPost.image}
                    fallbackSrc={creator.avatar}
                    alt={`Latest video from ${creator.name}: ${creator.latestPost.title}`}
                    sizes="(max-width: 1024px) calc(100vw - 3rem), 42vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
                    fallbackClassName="object-contain p-10"
                  />
                </div>
              ) : null}

              <div className={creator.latestPost ? "mt-5 sm:mt-0" : ""}>
                <div className="flex flex-col gap-5 min-[360px]:flex-row min-[360px]:items-center">
                  <CreatorAvatar creator={creator} large={!creator.latestPost} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-3xl leading-none tracking-[-0.025em] text-olive-900 sm:text-4xl">
                          {creator.name}
                        </h3>
                        <p className="mt-2 break-words stitch-label text-charcoal-700">
                          {creator.platform}
                          {creator.resolvedHandle ? ` · ${creator.resolvedHandle}` : ""}
                        </p>
                      </div>
                      <ExternalLinkIcon className="mt-1 h-5 w-5 text-olive-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </div>
                    {creator.description ? (
                      <p className="mt-3 max-w-md text-base leading-7 text-charcoal-700">
                        {creator.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                {creator.latestPost ? (
                  <div className="mt-5 border-t border-olive-900/10 pt-4">
                    <p className="stitch-label text-pimento-700">Latest on YouTube</p>
                    <p className="mt-2 line-clamp-2 font-serif text-xl leading-snug text-olive-900">
                      {creator.latestPost.title}
                    </p>
                  </div>
                ) : null}
              </div>
              <span className="sr-only">Open {creator.name} on {creator.platform} in a new tab</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
