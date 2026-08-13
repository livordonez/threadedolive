"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { MomentJournalEntry } from "@/components/moments/moment-journal-entry";
import type { Moment } from "@/lib/cms-types";
import { cn, formatCalendarDate } from "@/lib/utils";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function updateHash(slug: string) {
  if (!slug || window.location.hash === `#${slug}`) return;
  window.history.replaceState(null, "", `#${slug}`);
}

export function MomentsJournal({ moments }: { moments: Moment[] }) {
  const [activeSlug, setActiveSlug] = useState(moments[0]?.slug ?? "");
  const scrollingToSlug = useRef<string | null>(null);
  const firstImageIndex = moments.findIndex((moment) => moment.images[0]);

  useEffect(() => {
    if (!moments.length) return;

    const entries = Array.from(
      document.querySelectorAll<HTMLElement>("[data-moment-slug]"),
    );
    if (!entries.length) return;

    const observer = new IntersectionObserver(
      (observed) => {
        if (scrollingToSlug.current) return;

        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const next = visible[0]?.target.getAttribute("data-moment-slug");
        if (!next) return;

        startTransition(() => {
          setActiveSlug((current) => (current === next ? current : next));
        });
        updateHash(next);
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, [moments]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || !moments.some((moment) => moment.slug === hash)) return;

    const target = document.getElementById(hash);
    if (!target) return;

    scrollingToSlug.current = hash;
    const frame = window.requestAnimationFrame(() => {
      startTransition(() => setActiveSlug(hash));
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });

    const timeout = window.setTimeout(() => {
      scrollingToSlug.current = null;
    }, 700);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [moments]);

  function navigateToMoment(slug: string) {
    const target = document.getElementById(slug);
    if (!target) return;

    scrollingToSlug.current = slug;
    setActiveSlug(slug);
    updateHash(slug);
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    window.setTimeout(() => {
      if (scrollingToSlug.current === slug) {
        scrollingToSlug.current = null;
      }
    }, 700);
  }

  return (
    <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-12">
      <nav
        aria-label="Moments index"
        className="sticky top-[4.75rem] z-20 -mx-6 mb-6 border-y border-olive-900/10 bg-linen-0/95 px-6 py-3 backdrop-blur-md sm:-mx-10 sm:px-10 lg:top-28 lg:mx-0 lg:mb-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
      >
        <p className="stitch-label mb-3 hidden text-pimento-700 lg:block">
          In this notebook
        </p>
        <ul className="flex gap-3 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {moments.map((moment) => {
            const active = activeSlug === moment.slug;
            return (
              <li key={moment.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${moment.slug}`}
                  aria-current={active ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToMoment(moment.slug);
                  }}
                  className={cn(
                    "block min-w-[11rem] rounded-xl border px-3 py-2.5 transition-colors duration-200 motion-reduce:transition-none lg:min-w-0 lg:rounded-lg",
                    active
                      ? "border-olive-900/20 bg-olive-900 text-linen-0"
                      : "border-olive-900/10 bg-linen-0/80 text-olive-900 hover:border-olive-900/25 hover:bg-white/70 lg:border-transparent lg:bg-transparent lg:hover:bg-olive-50",
                  )}
                >
                  <span
                    className={cn(
                      "journal-hand block text-xl leading-tight",
                      active ? "text-linen-0" : "text-olive-900",
                    )}
                  >
                    {moment.title}
                  </span>
                  <time
                    dateTime={moment.moment_date}
                    className={cn(
                      "mt-1 block text-xs leading-5",
                      active ? "text-linen-0/80" : "text-charcoal-700",
                    )}
                  >
                    {formatCalendarDate(moment.moment_date)}
                  </time>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="journal-paper overflow-hidden rounded-[1.75rem]">
        {moments.map((moment, index) => (
          <MomentJournalEntry
            key={moment.id}
            moment={moment}
            preload={index === firstImageIndex}
          />
        ))}
      </div>
    </div>
  );
}
