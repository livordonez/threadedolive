import Image from "next/image";
import { cn } from "@/lib/utils";

export type BrandMotifName = "cat" | "granny-square" | "martini";

const motifSources: Record<BrandMotifName, string> = {
  cat: "/images/brand-motifs/cat.png",
  "granny-square": "/images/brand-motifs/granny-square.png",
  martini: "/images/brand-motifs/martini.png",
};

export function BrandMotif({
  motif,
  className,
}: {
  motif: BrandMotifName;
  className?: string;
}) {
  return (
    <Image
      src={motifSources[motif]}
      alt=""
      aria-hidden="true"
      width={1536}
      height={1024}
      sizes="160px"
      className={cn("brand-motif h-auto w-40 object-contain", className)}
    />
  );
}
