export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const calendarDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatCalendarDate(value: string) {
  return calendarDateFormatter.format(new Date(`${value}T00:00:00Z`));
}
