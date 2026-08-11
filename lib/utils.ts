import { crafts, placeholderTones, type Craft, type PlaceholderTone } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const calendarDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatLongDate(value: string) {
  return longDateFormatter.format(new Date(value));
}

export function formatMonthYear(value: string) {
  return monthYearFormatter.format(new Date(value));
}

export function formatCalendarDate(value: string) {
  return calendarDateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function isCraft(value: unknown): value is Craft {
  return typeof value === "string" && crafts.includes(value as Craft);
}

export function isPlaceholderTone(value: unknown): value is PlaceholderTone {
  return (
    typeof value === "string" &&
    placeholderTones.includes(value as PlaceholderTone)
  );
}

export function normalizeDate(value: unknown, fallback: string) {
  if (typeof value === "string") {
    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  return fallback;
}

export function sortByDateDesc<T, K extends keyof T>(
  items: T[],
  key: K,
): T[] {
  return [...items].sort((left, right) => {
    const leftTime = new Date(String(left[key])).getTime();
    const rightTime = new Date(String(right[key])).getTime();

    return rightTime - leftTime;
  });
}
