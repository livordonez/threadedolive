import { CurrentlyReading } from "@/components/muses/currently-reading";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { FavoriteFollows } from "@/components/muses/favorite-follows";
import { RecentPins } from "@/components/muses/recent-pins";
import { getFavoriteFollows, getPublishedMuses } from "@/lib/cms-data";
import { getCurrentlyReading } from "@/lib/integrations/goodreads";
import { getCreatorCards } from "@/lib/integrations/creators";
import { getRecentPins, type Pin } from "@/lib/integrations/pinterest";

export default async function MusesPage() {
  const [feedPins, books, muses, follows] = await Promise.all([
    getRecentPins(),
    getCurrentlyReading(),
    getPublishedMuses(),
    getFavoriteFollows(),
  ]);
  const creators = await getCreatorCards(follows);
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
      <EditorialPageHeader
        eyebrow="Muses"
        title="Things That Inspire Me"
        introduction="Pins, people, books, and whatever else has my attention."
      />

      <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-24 lg:space-y-28">
        <RecentPins pins={pins} />
        <FavoriteFollows follows={creators} />
        <CurrentlyReading books={books} />
      </div>
    </div>
  );
}
