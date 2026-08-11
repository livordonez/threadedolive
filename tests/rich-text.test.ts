import assert from "node:assert/strict";
import test from "node:test";
import { decodeRichText, encodeRichText } from "../lib/rich-text-format";
import { richTextHtml, sanitizeRichTextValue } from "../lib/rich-text";

test("preserves the supported post formatting", () => {
  const submitted = encodeRichText(
    "<p><strong>Bold</strong> <em>italic</em> <u>underlined</u></p><ul><li>One</li><li>Two</li></ul>",
  );
  const stored = sanitizeRichTextValue(submitted);

  assert.equal(
    richTextHtml(stored),
    "<p><strong>Bold</strong> <em>italic</em> <u>underlined</u></p><ul><li>One</li><li>Two</li></ul>",
  );
});

test("removes scripts, event handlers, images, and unsupported markup", () => {
  const submitted = encodeRichText(
    '<p onclick="steal()">Safe <span style="color:red">words</span></p><script>alert(1)</script><img src=x onerror="steal()">',
  );
  const stored = sanitizeRichTextValue(submitted);
  const html = richTextHtml(stored);

  assert.equal(html, "<p>Safe words</p>");
  assert.equal(html.includes("script"), false);
  assert.equal(html.includes("onclick"), false);
  assert.equal(html.includes("img"), false);
});

test("keeps legacy plain-text Moments readable and escapes markup", () => {
  assert.equal(
    richTextHtml("First <thought>\ncontinued\n\nSecond & final"),
    "<p>First &lt;thought&gt;<br />continued</p><p>Second &amp; final</p>",
  );
});

test("normalizes browser-generated divs and old bold and italic tags", () => {
  const stored = sanitizeRichTextValue(
    encodeRichText("<div><b>First</b></div><div><i>Second</i></div>"),
  );

  assert.equal(
    richTextHtml(stored),
    "<p><strong>First</strong></p><p><em>Second</em></p>",
  );
});

test("does not render an empty editor as an empty journal section", () => {
  const stored = sanitizeRichTextValue(encodeRichText("<p><br></p>"));

  assert.equal(richTextHtml(stored), "");
  assert.equal(decodeRichText(stored), "");
});
