"use client";

import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/cms-types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const socials = [
    settings.instagram_url ? { label: "Instagram", href: settings.instagram_url } : null,
    settings.pinterest_url ? { label: "Pinterest", href: settings.pinterest_url } : null,
  ].filter((item): item is { label: string; href: string } => Boolean(item));
  return (
    <footer className="site-textile-footer border-t border-olive-900/15">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="space-y-4">
          <p className="stitch-label text-pimento-700">Thanks for visiting</p>
          <p className="font-serif text-3xl tracking-[-0.04em] text-olive-900">
            {settings.site_name}
          </p>
          <p className="max-w-xl text-base leading-8 text-charcoal-700">
            {settings.short_description}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="stitch-label text-pimento-700">
              Elsewhere
            </p>
            <ul className="space-y-3 text-sm text-charcoal-700">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-olive-900 underline decoration-olive-900/20 underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="stitch-label text-pimento-700">A note from Liv</p>
            <p className="text-sm leading-7 text-charcoal-700">
              {settings.footer_text}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
