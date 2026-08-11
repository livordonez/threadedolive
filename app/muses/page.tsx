import { ArchiveEmptyState } from "@/components/archive-empty-state";
import { MuseCard } from "@/components/muse-card";
import { getPublishedMuses } from "@/lib/cms-data";

export default async function MusesPage() {
  const muses = await getPublishedMuses();
  const firstImageIndex = muses.findIndex((muse) => muse.images[0]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <header className="max-w-3xl">
        <p className="stitch-label text-pimento-700">Gathered inspiration</p>
        <h1 className="mt-4 font-serif text-6xl tracking-[-0.035em] text-olive-900 sm:text-7xl">
          Muses
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-charcoal-700">
          A pinboard of colors, people, places, books, and objects that are
          inspiring the work.
        </p>
      </header>

      {muses.length ? (
        <div className="mt-12 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {muses.map((muse, index) => (
            <MuseCard
              key={muse.id}
              muse={muse}
              preload={index === firstImageIndex}
            />
          ))}
        </div>
      ) : (
        <ArchiveEmptyState
          label="Inspiration will be pinned here."
          motif="books"
          swatchClassName="mustard-textile"
        />
      )}
    </div>
  );
}
