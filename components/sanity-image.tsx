import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage as SanityImageValue } from "@/sanity/lib/types";

const aspectStyles = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  wide: "aspect-[5/3]",
  square: "aspect-square",
} as const;

export function SanityImage({
  image,
  alt,
  label,
  aspect = "portrait",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 40vw",
}: {
  image?: SanityImageValue | null;
  alt: string;
  label: string;
  aspect?: keyof typeof aspectStyles;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const source = image ? urlForImage(image).width(1800).auto("format").url() : null;
  const altText = image?.alt?.trim() || alt;

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[2rem] border border-olive-900/10 bg-linen-0 shadow-[0_28px_80px_rgba(37,33,29,0.08)]",
        className,
      )}
    >
      {source ? (
        <div className={cn("relative", aspectStyles[aspect])}>
          <Image
            src={source}
            alt={altText}
            fill
            priority={priority}
            className="object-cover"
            sizes={sizes}
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={altText}
          className={cn(
            "relative isolate overflow-hidden bg-[linear-gradient(140deg,var(--color-linen-100),white_46%,var(--color-linen-0))]",
            aspectStyles[aspect],
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.38),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(52,77,56,0.08),transparent_26%),repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_12px,transparent_12px,transparent_30px)]" />
          <div className="absolute inset-5 rounded-[1.45rem] border border-white/35 border-dashed" />
          <div className="absolute bottom-5 left-5 max-w-[78%] rounded-full bg-linen-0/92 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-charcoal-900 shadow-sm">
            {label}
          </div>
        </div>
      )}
    </figure>
  );
}
