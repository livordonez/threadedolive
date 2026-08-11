import sanitizeHtml from "sanitize-html";
import {
  decodeRichText,
  encodeRichText,
  plainTextToHtml,
} from "@/lib/rich-text-format";

const options: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "em", "u", "ul", "ol", "li"],
  allowedAttributes: {},
  disallowedTagsMode: "discard",
  transformTags: {
    b: "strong",
    i: "em",
    div: "p",
  },
};

function clean(html: string) {
  const sanitized = sanitizeHtml(html.slice(0, 100_000), options).trim();
  const visibleText = sanitized
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .trim();
  return visibleText ? sanitized : "";
}

export function richTextHtml(value: string) {
  const storedHtml = decodeRichText(value);
  return clean(storedHtml ?? plainTextToHtml(value));
}

export function sanitizeRichTextValue(value: string) {
  const submittedHtml = decodeRichText(value) ?? plainTextToHtml(value);
  return encodeRichText(clean(submittedHtml));
}
