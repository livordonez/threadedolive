import Image from "next/image";
import type { CmsImage } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

export function ScallopedEdge({ className, flip = false }: { className?: string; flip?: boolean }) {
  return <div aria-hidden="true" className={cn("scalloped-edge", flip && "scalloped-edge-flip", className)} />;
}

export function PinkedEdge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("pinked-edge", className)}>{children}</div>;
}

export function FrayedEdge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("frayed-edge", className)}>{children}</div>;
}

export function LaceOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("lace-overlay", className)} />;
}

export function FabricSwatch({ image, label = "Project fabric" }: { image?: CmsImage; label?: string }) {
  return <figure className="w-36"><PinkedEdge className="relative aspect-square bg-olive-200 shadow-sm">{image ? <Image src={image.url} alt={image.alt || label} fill className="object-cover" sizes="144px" /> : <div className="mustard-textile h-full" />}</PinkedEdge><figcaption className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-charcoal-700">{label}</figcaption></figure>;
}
