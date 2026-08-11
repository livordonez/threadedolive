import { ArchiveEmptyState } from "@/components/archive-empty-state";
import { BrandMotif } from "@/components/brand-motif";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { MakeCard } from "@/components/make-card";
import { getPublishedMakes } from "@/lib/cms-data";

export default async function MakesPage() {
  const makes = await getPublishedMakes();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
      <EditorialPageHeader
        eyebrow="Makes"
        title="Things I’ve Made"
        introduction="Sewing, crochet, and whatever else I’ve got going on."
        decoration={<BrandMotif motif="granny-square" className="w-36" />}
      />

      {makes.length ? (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {makes.map((make, index) => (
            <MakeCard key={make.id} make={make} preload={index === 0} />
          ))}
        </div>
      ) : (
        <ArchiveEmptyState label="Makes will turn up here as I finish them." />
      )}
    </div>
  );
}
