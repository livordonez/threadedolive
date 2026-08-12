import { ArchiveEmptyState } from "@/components/archive-empty-state";
import { BrandMotif } from "@/components/brand-motif";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { MomentsJournal } from "@/components/moments/moments-journal";
import { getPublishedMoments } from "@/lib/cms-data";

export default async function MomentsPage() {
  const moments = await getPublishedMoments();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <EditorialPageHeader
        eyebrow="From my days"
        title="Moments"
        introduction="Small notes on making, getting dressed, and the bits in between — written like pages in a personal notebook."
        decoration={<BrandMotif motif="martini" className="w-32" />}
      />

      {moments.length ? (
        <MomentsJournal moments={moments} />
      ) : (
        <ArchiveEmptyState label="Notes will find their way here soon." />
      )}
    </div>
  );
}
