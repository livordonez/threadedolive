import Link from "next/link";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-olive-900/20 bg-white/70 p-10 text-center shadow-[0_18px_40px_rgba(37,33,29,0.05)]">
      <h2 className="font-serif text-3xl tracking-[-0.04em] text-olive-900">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-charcoal-700">
        {description}
      </p>
      {action ? (
        <Link
          href={action.href}
          className="mt-6 inline-flex rounded-full border border-olive-900/15 bg-linen-0 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-olive-900 transition-colors hover:border-olive-700/30 hover:bg-white"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
