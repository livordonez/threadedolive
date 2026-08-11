export const richTextVersion = 1;

type RichTextDocument = {
  version: typeof richTextVersion;
  html: string;
};

export function encodeRichText(html: string) {
  return JSON.stringify({ version: richTextVersion, html } satisfies RichTextDocument);
}

export function decodeRichText(value: string) {
  try {
    const candidate = JSON.parse(value) as Partial<RichTextDocument>;
    return candidate.version === richTextVersion && typeof candidate.html === "string"
      ? candidate.html
      : null;
  } catch {
    return null;
  }
}

export function plainTextToHtml(value: string) {
  const escaped = value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  return escaped
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replaceAll("\n", "<br>")}</p>`)
    .join("");
}
