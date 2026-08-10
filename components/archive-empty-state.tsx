import { StitchMotif, type StitchMotifName } from "@/components/stitch-motif";
import { cn } from "@/lib/utils";

export function ArchiveEmptyState({
  label,
  motif,
  className,
}: {
  label: string;
  motif: StitchMotifName;
  className?: string;
}) {
  return (
    <div className={cn("mt-12 grid min-h-80 place-items-center rounded-[2rem] border border-olive-900/15 p-8", className)}>
      <div className="flex max-w-lg flex-col items-center gap-5 rounded-[1.5rem] bg-linen-0/90 px-7 py-6 text-center shadow-sm">
        <StitchMotif motif={motif} className="h-14 w-14 text-olive-700" />
        <p className="font-serif text-2xl leading-snug text-olive-900">{label}</p>
      </div>
    </div>
  );
}
