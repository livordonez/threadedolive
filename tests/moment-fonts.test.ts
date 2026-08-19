import assert from "node:assert/strict";
import test from "node:test";
import {
  collectMomentFonts,
  googleFontsStylesheetHref,
  momentFontFamily,
  normalizeMomentFont,
} from "../lib/moment-fonts";

test("normalizes unknown moment fonts to Caveat", () => {
  assert.equal(normalizeMomentFont("not-a-font"), "caveat");
  assert.equal(normalizeMomentFont(null), "caveat");
});

test("builds a Google Fonts stylesheet for selected moment fonts", () => {
  const href = googleFontsStylesheetHref(["meow-script", "patrick-hand", "caveat"]);

  assert.match(href ?? "", /fonts\.googleapis\.com/);
  assert.match(href ?? "", /Meow(%20|\+)Script/);
  assert.match(href ?? "", /Patrick(%20|\+)Hand/);
  assert.doesNotMatch(href ?? "", /Caveat/);
});

test("uses the bundled Caveat variable for the default font", () => {
  assert.match(momentFontFamily("caveat"), /--font-journal-hand/);
});

test("collects unique title and body fonts from moments", () => {
  assert.deepEqual(
    collectMomentFonts([
      { title_font: "caveat", body_font: "meow-script" },
      { title_font: "patrick-hand", body_font: "meow-script" },
    ]),
    ["caveat", "meow-script", "patrick-hand"],
  );
});
