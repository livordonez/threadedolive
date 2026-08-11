import { CurrentlyReading } from "@/components/muses/currently-reading";
import { FavoriteFollows } from "@/components/muses/favorite-follows";
import { RecentPins } from "@/components/muses/recent-pins";
import { favoriteFollows } from "@/data/favorite-follows";
import { getPublishedMuses } from "@/lib/cms-data";
import { getCurrentlyReading } from "@/lib/integrations/goodreads";
import { getCreatorCards } from "@/lib/integrations/creators";
import { getRecentPins, type Pin } from "@/lib/integrations/pinterest";

export default async function MusesPage() {
  const [feedPins, books, muses, creators] = await Promise.all([
    getRecentPins(),
    getCurrentlyReading(),
    getPublishedMuses(),
    getCreatorCards(favoriteFollows),
  ]);
  const cmsPins: Pin[] = muses
    .filter((muse) => Boolean(muse.images[0]))
    .slice(0, 9)
    .map((muse) => ({
      image: muse.images[0].url,
      sourceUrl: muse.source_url || "https://www.pinterest.com/liv_ordonez/",
      title: muse.title,
      alt: muse.images[0].alt || muse.title,
    }));
  const pins = feedPins.length ? feedPins : cmsPins;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <header className="max-w-3xl">
        <p className="stitch-label text-pimento-700">Muses</p>
        <h1 className="mt-4 font-serif text-6xl tracking-[-0.035em] text-olive-900 sm:text-7xl">
          Things That Inspire Me
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-charcoal-700">
          Pins, people, books, and whatever else has my attention.
        </p>
      </header>

      <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-24 lg:space-y-28">
        <RecentPins pins={pins} />
        <FavoriteFollows follows={creators} />
        <CurrentlyReading books={books} />
      </div>
    </div>
  );
}
