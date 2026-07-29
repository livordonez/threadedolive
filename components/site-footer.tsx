import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-olive-900/10 bg-white/70">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-olive-900">
            <BrandMark className="h-10" />
            <div>
              <p className="font-serif text-2xl tracking-[-0.04em]">
                {siteConfig.name}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal-700">
                Crochet-centered studio portfolio
              </p>
            </div>
          </div>
          <p className="max-w-xl text-base leading-8 text-charcoal-700">
            {siteConfig.description} Placeholder social links are wired so the
            footer layout is ready for real destinations later.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Connect
            </p>
            <ul className="space-y-3 text-sm text-charcoal-700">
              {siteConfig.socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-semibold text-olive-900 underline decoration-olive-900/20 underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Studio note
            </p>
            <p className="text-sm leading-7 text-charcoal-700">
              Built to grow from local MDX files today into a future CMS or
              analytics-ready deployment later, without changing the public
              design language.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
