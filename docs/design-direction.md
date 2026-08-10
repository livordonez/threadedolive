# Threaded Olive design direction

Threaded Olive is an editorial sewing journal and personal creative archive. It should feel warm, tactile, quiet, and handmade while remaining spacious, legible, and photography-first.

## Decision order

When a design choice is uncertain:

1. Preserve clarity, usability, readability, and content.
2. Preserve the Threaded Olive visual language.
3. Favor editorial pacing, generous whitespace, and restraint.
4. Remove decoration that does not have a clear relationship to nearby content.

Decoration is punctuation, not the foundation. A page normally needs no more than one or two prominent textile treatments.

## Typography

- **EB Garamond** is the primary face for public headings, body copy, navigation, metadata, captions, and long-form editorial text.
- **Silkscreen** is the cross-stitch-inspired accent. Use the shared `stitch-label` class for short labels, dates, categories, and annotations only.
- Keep reading measures near `--content-reading` and avoid compensating for weak hierarchy with excessive size changes.

Fonts are loaded and self-hosted through `next/font` in `app/layout.tsx`.

## Textile primitives

Reusable treatments live in `components/textile-details.tsx` and `app/globals.css`:

- `ScallopedEdge` for occasional section transitions.
- `PinkedEdge` for fabric-like swatches and small cut pieces.
- `FrayedEdge` for rare editorial notes.
- `LaceOverlay` for restrained edge or behind-image detail.
- `FabricSwatch` for recognizable project material metadata.

Do not use every treatment on one page.

## Stitch motifs

`components/stitch-motif.tsx` contains the four standard motifs: cat, books, yarn basket, and olive branch. They are intentionally crisp, low-resolution SVG marks inspired by cross-stitch charts.

- Keep motifs small, like marginalia or dingbats.
- Prefer a semantic relationship: books for reading/inspiration, yarn for making, olive for general branding, and the cat for occasional personality.
- Use `ArchiveEmptyState` for the shared motif-backed empty-state treatment.
- Decorative motifs should remain hidden from assistive technology. Give a motif a `title` only when it carries meaning that is not already present in nearby text.

## Visual QA

Review affected pages at 375, 430, 768, 1024, and 1440 pixels when practical. Check composition—not only the absence of runtime errors—including alignment, crop quality, paragraph width, title wrapping, overflow, decorative anchoring, focus visibility, and footer/navigation behavior.

Photography should remain the dominant visual content. A strong photograph normally needs less decoration.

## Accessibility invariants

- `app/layout.tsx` owns the single public `<main>` landmark. Page components must not nest another `<main>` inside it.
- Do not add a late global anchor color or text-decoration rule. Link utilities provide intentional contrast and underlines, including the light active-navigation text on dark olive.
- Keep the shared `:focus-visible` outline intact and verify keyboard focus whenever link or navigation styling changes.
- Decorative textile details and motifs stay hidden from assistive technology unless they communicate information not already expressed in text.

## Core navigation behavior

Makes, Muses, and Moments are foundational archives, not optional feature links. `getNavigation()` fills in missing core routes when an older or partially migrated Supabase project lacks their rows. The admin Navigation screen also receives these fallback entries; saving it materializes them as ordinary database rows through an `href` upsert.

Admin saves also write an internal `/__navigation-configured` marker row. The data layer always filters that marker out of the interface. Its presence distinguishes an intentionally hidden item from a missing legacy row despite public row-level security hiding both, so later labels, order, and visibility choices remain authoritative.

The complete inline navigation starts at 1024px. Smaller widths use the menu panel so the brand and five core links never compete for horizontal space. The menu closes after a selection and when the Escape key is pressed.
