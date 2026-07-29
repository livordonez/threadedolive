"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-olive-900/10 bg-linen-50/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 text-olive-900"
          onClick={() => setIsOpen(false)}
        >
          <BrandMark className="h-10" />
          <div className="leading-tight">
            <span className="block font-serif text-2xl tracking-[-0.04em]">
              {siteConfig.name}
            </span>
            <span className="block text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-charcoal-700">
              Fiber arts portfolio
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 motion-reduce:transition-none",
                  active
                    ? "bg-olive-900 text-linen-0"
                    : "text-olive-900 hover:bg-white/70",
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
          className="inline-flex rounded-full border border-olive-900/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-olive-900 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          Menu
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "border-t border-olive-900/10 bg-linen-0 px-6 py-5 md:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-[1.25rem] px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]",
                  active
                    ? "bg-olive-900 text-linen-0"
                    : "bg-white/70 text-olive-900",
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
