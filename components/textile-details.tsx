import Image from "next/image";
import type { CmsImage } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

export function PinkedEdge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("pinked-edge", className)}>{children}</div>;
}

export function FrayedEdge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("frayed-edge", className)}>{children}</div>;
}

export function FabricSwatch({ image, label = "Material swatch" }: { image?: CmsImage; label?: string }) {
  return <figure className="w-36"><PinkedEdge className="relative aspect-square bg-olive-200">{image ? <Image src={image.url} alt={image.alt || label} fill className="object-cover" sizes="144px" /> : <div className="mustard-textile h-full" />}</PinkedEdge><figcaption className="stitch-label mt-2 text-charcoal-700">{label}</figcaption></figure>;
}
