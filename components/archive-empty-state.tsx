import { cn } from "@/lib/utils";

export function ArchiveEmptyState({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("mt-12 border-y border-olive-900/15 py-10 sm:py-12", className)}>
      <div className="max-w-2xl">
        <p className="stitch-label text-pimento-700">A quiet beginning</p>
        <p className="mt-2 font-serif text-3xl leading-tight tracking-[-0.025em] text-olive-900 sm:text-4xl">
          {label}
        </p>
      </div>
    </div>
  );
}
