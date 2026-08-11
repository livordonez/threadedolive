"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import type { NavigationItem, SiteSettings } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ settings, navigation }: { settings: SiteSettings; navigation: NavigationItem[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  if (pathname.startsWith("/admin")) return null;
  return (
    <header className="site-textile-header sticky top-0 z-40 border-b border-olive-900/15">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-1.5 text-olive-900 sm:gap-4"
          onClick={() => setIsOpen(false)}
        >
          <BrandMark
            className="h-10 w-auto sm:h-20"
            loading="eager"
            sizes="(min-width: 640px) 120px, 84px"
          />
          <div className="leading-tight">
            <span className="block whitespace-nowrap font-serif text-base tracking-[-0.04em] sm:text-3xl">
              {settings.site_name}
            </span>
            <span className="stitch-label hidden text-charcoal-700 sm:block">
              My creativity catch-all space
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "border-b-2 px-3 py-2 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-200 motion-reduce:transition-none xl:px-4 xl:tracking-[0.14em]",
                  active
                    ? "border-olive-900 text-olive-900"
                    : "border-transparent text-olive-900 hover:border-olive-900/30",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 items-center border-b-2 border-olive-900/30 px-2 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-olive-900 sm:px-3 sm:tracking-[0.16em] lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "border-t border-olive-900/10 bg-linen-0 px-6 py-5 lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "border-b px-1 py-3 text-sm font-semibold uppercase tracking-[0.16em]",
                  active
                    ? "border-olive-900 text-olive-900"
                    : "border-olive-900/10 text-olive-900",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
