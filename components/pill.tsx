import { cn } from "@/lib/utils";

const toneStyles = {
  olive: "border-olive-200 bg-olive-100 text-olive-900",
  linen: "border-olive-900/10 bg-linen-0 text-charcoal-700",
  pimento: "border-pimento-200 bg-pimento-100 text-pimento-700",
  brass: "border-brass-200 bg-brass-100 text-brass-700",
  charcoal: "border-charcoal-200 bg-white/70 text-charcoal-900",
} as const;

export type PillTone = keyof typeof toneStyles;

export function Pill({
  children,
  tone = "linen",
  className,
}: {
  children: React.ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em]",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
