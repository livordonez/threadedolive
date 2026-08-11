# The Threaded Olive

A personal creative blog for the things Liv makes, wears, reads, and loves, with its own private single-owner editor. Content lives in Supabase rather than repository files.

## What is included

- Concise public navigation for Home, Makes, Muses, and About. Existing Moments content remains available at `/moments` without occupying the primary navigation.
- Private editor at `/admin` for makes, muses, moments, flexible pages, about content, navigation, site settings, and photograph uploads.
- Draft, publish, unpublish, preview, ordering, cover-photo selection, alt text, and seven intentionally small flexible-page section types.
- Supabase Auth, Postgres row-level security, and Storage policies. Every server mutation checks the authenticated admin again.

## Local setup

This project requires Node 20.9 or newer; Node 22 is selected by `.nvmrc`.

1. Create a Supabase project.
2. In the Supabase SQL editor, run every SQL file in [`supabase/migrations`](supabase/migrations) in filename order.
3. In Supabase Authentication, disable new-user signups. Create the one owner user from the dashboard (email and password).
4. Copy that user's UUID, then run this once in the SQL editor:

   ```sql
   insert into public.admin_users (user_id) values ('YOUR-USER-UUID');
   ```

5. Copy `.env.example` to `.env.local` and add the project URL and publishable anon key. Do not add a service-role key; this app does not need one.
6. Run `npm install`, then `npm run dev` and open `http://localhost:3000/admin`.

The migration makes the image bucket public for serving published photographs, but only the authenticated admin may upload, change, or delete files. Draft rows remain private through row-level security.

If an existing project reports that `public.muses` or `public.moments` is missing,
run [`20260811000000_repair_muses_and_moments.sql`](supabase/migrations/20260811000000_repair_muses_and_moments.sql)
in the Supabase SQL editor. It is idempotent and can safely be run after the earlier
migrations.

Moment bodies are stored as versioned, sanitized rich text in the existing `body`
column. The editor supports bold, italic, underline, and bulleted lists; legacy
plain-text Moments are converted for display without requiring a database migration.

## Deployment

Add the same two public Supabase environment variables to the deployment platform. The anon key is designed for browser use; authorization comes from database policies and the signed-in session. Never add Supabase's service-role credential to this project.

Canonical, Open Graph, manifest, and Twitter metadata use `https://threadedolive.vercel.app` from `lib/site.ts`. Update that single value if the production site moves to a custom domain.

## Previous content

The original MDX project and journal files remain under `content/` for manual reference while real content is entered through the editor. They are no longer public routes or runtime content sources; the obsolete MDX rendering components have been removed so they cannot drift into a second design system.

## Visual system

The public site uses EB Garamond through `next/font` as its primary editorial typeface and Silkscreen only for tiny cross-stitch-inspired labels. The canvas is deliberately flat: solid color, fine rules, restrained textile texture, and no added gradients or decorative shadows. Pinked and frayed edges are reserved for the few places where they communicate material or notebook context.

Read [`docs/design-direction.md`](docs/design-direction.md) before substantial visual work. It documents the durable hierarchy, typography, textile primitives, motif conventions, and responsive QA expectations that keep the site from drifting into a busier craft-store aesthetic.

## Muses

The public Muses composition lives in `app/muses/page.tsx`, with focused sections in `components/muses/`. External responses are parsed and normalized in `lib/integrations/`; the components never depend on Pinterest or Goodreads response fields directly.

### Recently Pinned

`components/muses/recent-pins.tsx` renders up to nine images as an editorial collage. `lib/integrations/pinterest.ts` reads Liv's public Pinterest profile RSS feed server-side. The feed directly reflects recently saved public Pins and does not require an access token. Responses revalidate every six hours through the Next.js data cache. If the feed is unavailable or empty, published CMS Muses with images become the fallback; if neither source has images, the section shows a quiet link to Pinterest instead of an error or broken containers.

`MUSES_PINTEREST_RSS_URL` can override the default feed URL. Keep it server-only. Pinterest's authenticated API is intentionally not used: the public RSS source is sufficient for this personal collection and avoids credential lifecycle and browser-side requests.

### My Favorite Follows

Favorite Follows are managed from **Admin → Muses → Favorite Follows**. Choose **Add Favorite Follow**, enter a creator name and full profile link, upload one recognizable profile image, and enable **Show on the public Muses page** when it is ready. Display order controls the sequence. Platform and social handle are derived from the profile link; the short note and handle override are optional.

The database-backed workflow requires [`20260811030000_favorite_follows.sql`](supabase/migrations/20260811030000_favorite_follows.sql). The migration creates the table and policies and seeds Syd Graham and Bethany Ciotola with the existing local portraits. If the table has not been migrated or the database is unavailable, the public page retains those two records from `data/favorite-follows.ts`; the admin shows a migration notice instead of a broken form.

For YouTube, the optional channel ID enables `lib/integrations/creators.ts` to read the official public channel feed server-side and cache the latest-video preview for six hours. If the feed or thumbnail fails, the card falls back to the creator avatar. Other platforms use the avatar-first profile card rather than a login-dependent embed. Missing avatars fall back to initials without showing a broken image. Current seeded portraits live in `public/images/creators/`; future admin uploads use the existing protected Supabase Storage workflow.

### From the Nightstand

`components/muses/currently-reading.tsx` displays the normalized records returned by `lib/integrations/goodreads.ts`. The integration reads the public RSS feed for Liv's `currently-reading` shelf, supports multiple books, and revalidates hourly. Goodreads authentication and its retired public API are not required. If Goodreads is unavailable or the shelf is empty, the page renders a deliberate empty state.

`MUSES_GOODREADS_USER_ID` can point the integration at another public profile. The default is Liv's numeric Goodreads user ID.

### Brand motifs

Cat, granny square, and martini are the canonical Threaded Olive mini illustrations. Their original PNG files live in `public/images/brand-motifs/`, and `components/brand-motif.tsx` provides the shared decorative renderer. The yarn-and-needle brand mark lives separately in `public/images/threaded-olive-logo-v3.webp` and belongs in the masthead rather than as general page decoration. Keep the supplied colors, transparency, proportions, orientation, format, and crisp pixel edges unchanged; do not add shadows, glows, or filters. Use motifs as occasional signatures, not as gap fillers.
