import type { Craft } from "@/lib/types";
import { Pill, type PillTone } from "@/components/pill";

const craftTones: Record<Craft, PillTone> = {
  Crochet: "olive",
  Sewing: "pimento",
  Knitting: "brass",
  Embroidery: "charcoal",
  Needlepoint: "linen",
};

export function CraftPill({
  craft,
  className,
}: {
  craft: Craft;
  className?: string;
}) {
  return (
    <Pill tone={craftTones[craft]} className={className}>
      {craft}
    </Pill>
  );
}
