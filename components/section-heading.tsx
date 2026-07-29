import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: {
    href: string;
    label: string;
  };
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pimento-700">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-4xl leading-none tracking-[-0.04em] text-olive-900 sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-base leading-8 text-charcoal-700">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 self-start rounded-full border border-olive-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-olive-900 transition-colors hover:border-olive-700/30 hover:bg-white"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
