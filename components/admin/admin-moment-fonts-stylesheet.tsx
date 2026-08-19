import { adminMomentFontsStylesheetHref } from "@/lib/moment-fonts";

export function AdminMomentFontsStylesheet() {
  const href = adminMomentFontsStylesheetHref();
  if (!href) return null;

  return <link rel="stylesheet" href={href} />;
}
