const photoPlaceholders = ["aspect-[4/5]", "aspect-[4/5]", "aspect-[4/5]"];

export default function PageLoading() {
  return (
    <section
      className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20"
      aria-busy="true"
      aria-live="polite"
    >
      <div role="status" className="max-w-3xl">
        <p className="stitch-label text-pimento-700">Just a moment</p>
        <span className="sr-only">Loading The Threaded Olive.</span>
        <div aria-hidden="true" className="mt-5 space-y-4">
          <div className="h-12 w-full max-w-lg bg-olive-900/[0.08] sm:h-16" />
          <div className="h-3 w-full max-w-xl bg-charcoal-700/[0.08]" />
          <div className="h-3 w-3/5 max-w-sm bg-charcoal-700/[0.08]" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-12 grid gap-x-6 gap-y-10 border-t border-olive-900/15 pt-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {photoPlaceholders.map((aspect, index) => (
          <div
            key={index}
            className={index === 2 ? "hidden lg:block" : undefined}
          >
            <div
              className={`${aspect} overflow-hidden rounded-[1.5rem] border border-olive-900/[0.06] bg-olive-100/55`}
            >
              <div className="cream-ticking-textile h-3 w-full opacity-40" />
            </div>
            <div className="mt-4 h-7 w-2/3 bg-olive-900/[0.07]" />
            <div className="mt-3 h-2.5 w-1/3 bg-pimento-700/[0.08]" />
          </div>
        ))}
      </div>
    </section>
  );
}
