export const defaultMomentFont = "caveat" as const;

export type MomentFontSlug = (typeof momentFontOptions)[number]["slug"];

export const momentFontOptions = [
  { slug: "caveat", label: "Caveat", family: "Caveat", weights: "400;500;600;700" },
  { slug: "meow-script", label: "Meow Script", family: "Meow Script", weights: "400" },
  { slug: "patrick-hand", label: "Patrick Hand", family: "Patrick Hand", weights: "400" },
  { slug: "handlee", label: "Handlee", family: "Handlee", weights: "400" },
  { slug: "homemade-apple", label: "Homemade Apple", family: "Homemade Apple", weights: "400" },
  { slug: "dancing-script", label: "Dancing Script", family: "Dancing Script", weights: "400;500;600;700" },
  { slug: "satisfy", label: "Satisfy", family: "Satisfy", weights: "400" },
  { slug: "marck-script", label: "Marck Script", family: "Marck Script", weights: "400" },
  { slug: "nothing-you-could-do", label: "Nothing You Could Do", family: "Nothing You Could Do", weights: "400" },
  { slug: "reenie-beanie", label: "Reenie Beanie", family: "Reenie Beanie", weights: "400" },
  { slug: "shadows-into-light", label: "Shadows Into Light", family: "Shadows Into Light", weights: "400" },
  { slug: "indie-flower", label: "Indie Flower", family: "Indie Flower", weights: "400" },
  { slug: "kalam", label: "Kalam", family: "Kalam", weights: "300;400;700" },
  { slug: "rock-salt", label: "Rock Salt", family: "Rock Salt", weights: "400" },
  { slug: "covered-by-your-grace", label: "Covered By Your Grace", family: "Covered By Your Grace", weights: "400" },
  { slug: "annie-use-your-telescope", label: "Annie Use Your Telescope", family: "Annie Use Your Telescope", weights: "400" },
  { slug: "gochi-hand", label: "Gochi Hand", family: "Gochi Hand", weights: "400" },
  { slug: "delicious-handrawn", label: "Delicious Handrawn", family: "Delicious Handrawn", weights: "400" },
] as const;

const fontBySlug = new Map(momentFontOptions.map((option) => [option.slug, option]));

export function normalizeMomentFont(value: string | null | undefined): MomentFontSlug {
  if (value && fontBySlug.has(value as MomentFontSlug)) {
    return value as MomentFontSlug;
  }

  return defaultMomentFont;
}

export function momentFontFamily(value: string | null | undefined): string {
  const slug = normalizeMomentFont(value);

  if (slug === defaultMomentFont) {
    return 'var(--font-journal-hand), "Segoe Print", cursive';
  }

  const option = fontBySlug.get(slug);
  return option ? `"${option.family}", cursive` : 'var(--font-journal-hand), cursive';
}

export function collectMomentFonts(moments: Array<{ title_font?: string | null; body_font?: string | null }>) {
  const slugs = new Set<MomentFontSlug>();

  for (const moment of moments) {
    slugs.add(normalizeMomentFont(moment.title_font));
    slugs.add(normalizeMomentFont(moment.body_font));
  }

  return [...slugs];
}

export function googleFontsStylesheetHref(slugs: Iterable<string>): string | null {
  const families = [...new Set([...slugs].map(normalizeMomentFont))]
    .filter((slug) => slug !== defaultMomentFont)
    .map((slug) => {
      const option = fontBySlug.get(slug);
      if (!option) return null;
      return `family=${encodeURIComponent(option.family)}:wght@${option.weights}`;
    })
    .filter(Boolean);

  if (!families.length) return null;

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

export function adminMomentFontsStylesheetHref() {
  return googleFontsStylesheetHref(momentFontOptions.map((option) => option.slug));
}
