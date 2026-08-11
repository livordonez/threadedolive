import { ArchiveEmptyState } from "@/components/archive-empty-state";
import { MomentCard } from "@/components/moment-card";
import { getPublishedMoments } from "@/lib/cms-data";

export default async function MomentsPage() {
  const moments = await getPublishedMoments();
  const firstImageIndex = moments.findIndex((moment) => moment.images[0]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <header className="max-w-3xl">
        <p className="stitch-label text-pimento-700">Notes from the day</p>
        <h1 className="mt-4 font-serif text-6xl tracking-[-0.035em] text-olive-900 sm:text-7xl">
          Moments
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-charcoal-700">
          Small stories from the worktable and everyday life, written while
          they’re still close.
        </p>
      </header>

      {moments.length ? (
        <div className="mt-12 border-y border-olive-900/15">
          {moments.map((moment, index) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              preload={index === firstImageIndex}
            />
          ))}
        </div>
      ) : (
        <ArchiveEmptyState
          label="The first moment has not been written yet."
          motif="cat"
          swatchClassName="cream-ticking-textile"
        />
      )}
    </div>
  );
}
