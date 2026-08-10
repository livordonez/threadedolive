import { cn } from "@/lib/utils";

export type StitchMotifName = "cat" | "books" | "yarn" | "olive";

export function StitchMotif({
  motif,
  className,
  title,
}: {
  motif: StitchMotifName;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("stitch-motif", className)}
      shapeRendering="crispEdges"
    >
      {motif === "cat" ? <Cat /> : null}
      {motif === "books" ? <Books /> : null}
      {motif === "yarn" ? <YarnBasket /> : null}
      {motif === "olive" ? <OliveBranch /> : null}
    </svg>
  );
}

function Cat() {
  return (
    <g fill="currentColor">
      <path d="M7 3h2V1h3l1 2 1-2h3v2h2v9h-2v2h1v8h-4v-7h-2v7H8v-8H6v3H4v-2H2V9h2v4h2v-1H7V3Z" />
      <path d="M9 5h8v5H9Z" fill="var(--linen-0)" />
      <path d="M10 6h1v1h-1zm5 0h1v1h-1z" />
      <path d="M12 8h2v1h-2z" fill="var(--pimento-700)" />
    </g>
  );
}

function Books() {
  return (
    <g fill="currentColor">
      <path d="M4 5h14v2H7v2h12v4H6v2h13v4H4v-2h13v-2H5v-4h12V9H5V7H4V5Z" />
      <path d="M6 11h9v1H6zm1 6h8v1H7z" fill="var(--linen-0)" />
      <path d="M18 5h2v2h-2zm1 6h1v2h-1zm0 6h1v2h-1z" fill="var(--pimento-700)" />
    </g>
  );
}

function YarnBasket() {
  return (
    <g fill="currentColor">
      <path d="M4 10h16v2h-1v8H5v-8H4v-2Zm3 3v1h2v-1H7Zm4 0v1h2v-1h-2Zm4 0v1h2v-1h-2ZM7 16v1h2v-1H7Zm4 0v1h2v-1h-2Zm4 0v1h2v-1h-2Z" />
      <path d="M6 7h2V5h4v2h1V4h4v2h2v4H6V7Z" />
      <path d="M8 6h3v3H8zm6-1h3v4h-3z" fill="var(--olive-500)" />
      <path d="M18 4h1v2h-1zm1-1h1v1h-1z" fill="var(--pimento-700)" />
    </g>
  );
}

function OliveBranch() {
  return (
    <g fill="currentColor">
      <path d="M4 19h2v-2h2v-2h2v-2h2v-2h2V9h2V7h2V5h2v2h-2v2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v-2Z" />
      <path d="M7 13H4v-3h2v1h2v2H7Zm4-4H8V6h2v1h2v2h-1Zm4-4h-3V2h2v1h2v2h-1Zm1 10h3v3h-2v-1h-2v-2h1Zm4-5h2v3h-3v-2h1v-1Z" />
      <path d="M5 15h2v2H5zm7-5h2v2h-2zm6-3h2v2h-2z" fill="var(--pimento-700)" />
    </g>
  );
}
