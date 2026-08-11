import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EditorialPageHeader({
  eyebrow,
  title,
  introduction,
  decoration,
  className,
}: {
  eyebrow: string;
  title: string;
  introduction?: string;
  decoration?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative max-w-4xl", className)}>
      <div className={cn("max-w-3xl", Boolean(decoration) && "sm:pr-44")}>
        <p className="stitch-label text-pimento-700">{eyebrow}</p>
        <h1 className="mt-4 text-balance font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-olive-900 sm:text-7xl">
          {title}
        </h1>
        {introduction ? (
          <p className="mt-5 max-w-2xl text-xl leading-8 text-charcoal-700">
            {introduction}
          </p>
        ) : null}
      </div>
      {decoration ? (
        <div className="absolute right-0 top-0 hidden sm:block" aria-hidden="true">
          {decoration}
        </div>
      ) : null}
    </header>
  );
}
