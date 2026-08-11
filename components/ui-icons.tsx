import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = ComponentProps<"svg">;

function iconClass(className?: string) {
  return cn("inline-block h-[1em] w-[1em] shrink-0 overflow-visible", className);
}

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={iconClass(className)} {...props}>
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={iconClass(className)} {...props}>
      <path d="M13.5 8h-10M7 4.5 3.5 8 7 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalLinkIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={iconClass(className)} {...props}>
      <path d="M6 4.5H3.75A1.25 1.25 0 0 0 2.5 5.75v6.5a1.25 1.25 0 0 0 1.25 1.25h6.5a1.25 1.25 0 0 0 1.25-1.25V10M8.5 2.5h5v5M13.25 2.75 7.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
