import { googleFontsStylesheetHref } from "@/lib/moment-fonts";

export function MomentGoogleFontsStylesheet({ fontSlugs }: { fontSlugs: string[] }) {
  const href = googleFontsStylesheetHref(fontSlugs);
  if (!href) return null;

  return <link rel="stylesheet" href={href} />;
}
