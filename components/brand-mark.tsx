import { cn } from "@/lib/utils";

export function BrandMark({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 124 72"
      aria-hidden="true"
      className={cn("h-11 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 60L112 16"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M108 13.5L116 17L111.5 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="38" cy="47" rx="14" ry="11.5" fill="#344d38" />
      <ellipse cx="61" cy="36" rx="14" ry="11.5" fill="#415f46" />
      <ellipse cx="84" cy="25" rx="14" ry="11.5" fill="#587059" />
      <circle cx="44" cy="49" r="3.4" fill="#b46a60" />
      <circle cx="67" cy="38" r="3.4" fill="#b46a60" />
      <circle cx="90" cy="27" r="3.4" fill="#b46a60" />
      <path
        d="M12 60C12 60 16 56 20 56"
        stroke="#b28b49"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
