import { ArchiveEmptyState } from "@/components/archive-empty-state";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { MomentCard } from "@/components/moment-card";
import { getPublishedMoments } from "@/lib/cms-data";

export default async function MomentsPage() {
  const moments = await getPublishedMoments();
  const firstImageIndex = moments.findIndex((moment) => moment.images[0]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <EditorialPageHeader
        eyebrow="From my days"
        title="Moments"
        introduction="Small notes on making, getting dressed, and the bits in between."
      />

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
          label="Notes will find their way here soon."
        />
      )}
    </div>
  );
}
