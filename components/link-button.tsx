import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  solid:
    "bg-olive-900 text-linen-0 hover:bg-olive-700",
  outline:
    "border border-olive-900/15 bg-white/70 text-olive-900 hover:border-olive-700/30 hover:bg-white",
  ghost:
    "bg-transparent text-olive-900 hover:bg-white/70",
} as const;

export function LinkButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.08em] transition-colors duration-200 motion-reduce:transition-none",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
