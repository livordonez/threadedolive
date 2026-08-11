import { StitchMotif, type StitchMotifName } from "@/components/stitch-motif";
import { PinkedEdge } from "@/components/textile-details";
import { cn } from "@/lib/utils";

export function ArchiveEmptyState({
  label,
  motif,
  className,
  swatchClassName,
}: {
  label: string;
  motif: StitchMotifName;
  className?: string;
  swatchClassName?: string;
}) {
  return (
    <div className={cn("mt-12 border-y border-olive-900/15 py-10 sm:py-12", className)}>
      <div className="grid justify-items-center gap-6 text-center sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-center sm:justify-items-start sm:text-left">
        <PinkedEdge
          className={cn(
            "grid aspect-square w-24 place-items-center bg-olive-100",
            swatchClassName,
          )}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-linen-0/90 shadow-sm">
            <StitchMotif motif={motif} className="h-10 w-10 text-olive-700" />
          </span>
        </PinkedEdge>
        <div className="max-w-2xl">
          <p className="stitch-label text-pimento-700">A quiet beginning</p>
          <p className="mt-2 font-serif text-3xl leading-tight tracking-[-0.025em] text-olive-900 sm:text-4xl">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
