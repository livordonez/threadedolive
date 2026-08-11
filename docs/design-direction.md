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

## Brand motifs

Cat, granny square, and martini are the complete miniature illustration vocabulary. Final source artwork belongs in `public/images/brand-motifs/` and must remain visually unmodified. Do not redraw, recolor, rotate, filter, soften, or reinterpret it. Preserve the supplied file format where reasonable and render raster pixel art with crisp edges.

- Keep motifs small, like signatures, marginalia, or dingbats.
- Prefer a semantic relationship: granny square near making and textiles, cat near reading or personal notes, and martini near lifestyle or playful moments.
- A page may use one motif or none. Do not place all three by default.
- Do not introduce replacement books, yarn, olive, or miscellaneous miniature illustrations.
- Keep archive empty states primarily typographic when a final motif does not clearly improve the composition.
- Decorative motifs stay hidden from assistive technology unless they communicate information not already present in nearby text.

The August 11, 2026 brief did not include the three source files, so their destination contains placement instructions rather than fabricated stand-ins.

## Visual QA

Review affected pages at 375, 430, 768, 1024, and 1440 pixels when practical. Check composition—not only the absence of runtime errors—including alignment, crop quality, paragraph width, title wrapping, overflow, decorative anchoring, focus visibility, and footer/navigation behavior.

Photography should remain the dominant visual content. A strong photograph normally needs less decoration.

## Image loading

- Use Next.js `preload` for one genuine photographic hero or the first archive card only. Later grid and gallery images stay lazy.
- Every `BrandMark` instance needs an accurate `sizes` value. Above-the-fold header and admin marks load eagerly, the large homepage mark is eager with high fetch priority, and the footer mark remains lazy.
- Keep the local raster logo optimized by `next/image`. Do not reintroduce the deprecated `priority` prop or bypass optimization with `unoptimized`.

## Public edge states

`app/not-found.tsx` and `components/page-loading.tsx` share the public site's editorial spacing and restrained textile language. Keep loading UI static and lightweight, with a polite status for assistive technology. Not-found actions must point to the live Home, Makes, Muses, and Moments routes; do not revive retired portfolio or journal paths.

## Archive indexes

The three core archives intentionally use different editorial rhythms while sharing typography, gutters, and image restraint. Makes is a regular photography grid. Muses is one editorial page composed from Recent Pins, Favorite Follows, and Currently Reading; external data stays visually subordinate to Threaded Olive's typography and pacing. Moments is a ruled journal index with generous mobile photographs and compact desktop thumbnails. Do not wrap populated Muse or Moment entries in generic white card shells.

## Moment stories

`components/moment-story.tsx` owns the journal-entry composition. Keep its sequence stable: semantic date and title, one optional frayed excerpt, the first image as a generous hero, reading-width journal text, then proportion-aware gallery images. Text-only Moments must retain the same hierarchy without substituting a decorative image placeholder. Fraying is reserved for the introductory excerpt and should not spread to the body or gallery.

## Accessibility invariants

- `app/layout.tsx` owns the single public `<main>` landmark. Page components must not nest another `<main>` inside it.
- Do not add a late global anchor color or text-decoration rule. Link utilities provide intentional contrast and underlines, including the light active-navigation text on dark olive.
- Keep the shared `:focus-visible` outline intact and verify keyboard focus whenever link or navigation styling changes.
- Decorative textile details and motifs stay hidden from assistive technology unless they communicate information not already expressed in text.

## Core navigation behavior

Makes, Muses, and Moments are foundational archives, not optional feature links. `getNavigation()` fills in missing core routes when an older or partially migrated Supabase project lacks their rows. The admin Navigation screen also receives these fallback entries; saving it materializes them as ordinary database rows through an `href` upsert.

Admin saves also write an internal `/__navigation-configured` marker row. The data layer always filters that marker out of the interface. Its presence distinguishes an intentionally hidden item from a missing legacy row despite public row-level security hiding both, so later labels, order, and visibility choices remain authoritative.

The complete inline navigation starts at 1024px. Smaller widths use the menu panel so the brand and five core links never compete for horizontal space. The menu closes after a selection and when the Escape key is pressed.

## Story Behind the Make

`components/make-story.tsx` owns the public project-detail composition. Keep its hierarchy stable: project title and main photograph first, the long-form story in a separate reading-width section, then project particulars, gallery photography, and reflective notes.

The first uploaded image is the hero. When project particulars exist, the second image is the material swatch and later images form the gallery; without particulars, all secondary images remain in the gallery. The particulars section stays on the warm page background so only the small pinked swatch carries fabric texture. This prevents metadata from competing with the project story or photography.
