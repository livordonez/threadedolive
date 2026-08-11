import Image from "next/image";
import type { ContentImage } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneStyles = {
  olive:
    "bg-[linear-gradient(140deg,var(--color-olive-900),var(--color-olive-700)_46%,var(--color-brass-300))]",
  linen:
    "bg-[linear-gradient(140deg,var(--color-linen-100),var(--color-linen-0)_46%,white)]",
  pimento:
    "bg-[linear-gradient(140deg,var(--color-pimento-700),var(--color-pimento-400)_48%,var(--color-linen-100))]",
  brass:
    "bg-[linear-gradient(140deg,var(--color-brass-700),var(--color-brass-500)_48%,var(--color-linen-100))]",
  charcoal:
    "bg-[linear-gradient(140deg,var(--color-charcoal-900),var(--color-charcoal-700)_48%,var(--color-linen-100))]",
} as const;

const aspectStyles = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  wide: "aspect-[5/3]",
  square: "aspect-square",
} as const;

export function MediaPlaceholder({
  image,
  aspect = "portrait",
  className,
}: {
  image: ContentImage;
  aspect?: keyof typeof aspectStyles;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[2rem] border border-olive-900/10 bg-linen-0 shadow-[0_28px_80px_rgba(37,33,29,0.08)]",
        className,
      )}
    >
      {image.src ? (
        <div className={cn("relative", aspectStyles[aspect])}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 40vw"
            style={
              image.objectPosition
                ? { objectPosition: image.objectPosition }
                : undefined
            }
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className={cn(
            "relative isolate overflow-hidden",
            aspectStyles[aspect],
            toneStyles[image.tone],
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.3),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(255,255,255,0.2),transparent_26%),repeating-linear-gradient(135deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.07)_10px,transparent_10px,transparent_28px)]" />
          <div className="absolute inset-5 rounded-[1.45rem] border border-white/35 border-dashed" />
          <div className="absolute inset-x-4 top-[22%] h-px bg-white/30" />
          <div className="absolute inset-x-7 top-[57%] h-px rotate-[-8deg] bg-white/25" />
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-white/35 bg-white/10 blur-[1px]" />
          <div className="absolute right-8 top-10 h-12 w-12 rounded-full border border-white/25 bg-white/5" />
          <div className="absolute bottom-5 left-5 max-w-[78%] rounded-full bg-linen-0/92 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-charcoal-900 shadow-sm">
            {image.label}
          </div>
        </div>
      )}
      <figcaption className="sr-only">{image.alt}</figcaption>
    </figure>
  );
}
