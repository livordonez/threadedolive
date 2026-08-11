# Threaded Olive

A photography-first fiber arts archive with its own private, single-owner editor. Content lives in Supabase rather than repository files.

## What is included

- A three-part public archive: Makes at `/makes`, inspiration in Muses at `/muses`, and journal writing in Moments at `/moments`.
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

## Previous content

The original MDX project and journal files remain under `content/` as an archive for manual reference while real content is entered through the editor. They are no longer public routes or runtime content sources.

## Visual system

The public site uses self-hosted EB Garamond as its primary editorial typeface and Silkscreen only for tiny cross-stitch-inspired labels. Textile edges are reusable design primitives rather than page-specific decoration.

Read [`docs/design-direction.md`](docs/design-direction.md) before substantial visual work. It documents the durable hierarchy, typography, textile primitives, motif conventions, and responsive QA expectations that keep the site from drifting into a busier craft-store aesthetic.

## Muses

The public Muses composition lives in `app/muses/page.tsx`, with focused sections in `components/muses/`. External responses are parsed and normalized in `lib/integrations/`; the components never depend on Pinterest or Goodreads response fields directly.

### Recent Pins

`components/muses/recent-pins.tsx` renders up to nine images as an editorial collage. `lib/integrations/pinterest.ts` reads Liv's public Pinterest profile RSS feed server-side. The feed directly reflects recently saved public Pins and does not require an access token. Responses revalidate every six hours through the Next.js data cache. If the feed is unavailable or empty, published CMS Muses with images become the fallback; if neither source has images, the section shows a quiet link to Pinterest instead of an error or broken containers.

`MUSES_PINTEREST_RSS_URL` can override the default feed URL. Keep it server-only. Pinterest's authenticated API is intentionally not used: the public RSS source is sufficient for this personal collection and avoids credential lifecycle and browser-side requests.

### Favorite Follows

Creator records live in `data/favorite-follows.ts`. To add someone, add one object with `name`, `platform`, and `url`; `description` and `image` are optional. Use a direct, permitted image URL if adding a portrait, and add its hostname narrowly to `images.remotePatterns` in `next.config.ts`. The section treats the creator name and note as primary and the platform as small metadata.

### Currently Reading

`components/muses/currently-reading.tsx` displays the normalized records returned by `lib/integrations/goodreads.ts`. The integration reads the public RSS feed for Liv's `currently-reading` shelf, supports multiple books, and revalidates hourly. Goodreads authentication and its retired public API are not required. If Goodreads is unavailable or the shelf is empty, the page renders a deliberate empty state.

`MUSES_GOODREADS_USER_ID` can point the integration at another public profile. The default is Liv's numeric Goodreads user ID.

### Brand motifs

Cat, granny square, and martini are the only canonical Threaded Olive mini illustrations. Their original PNG files live in `public/images/brand-motifs/`, and `components/brand-motif.tsx` provides the shared decorative renderer. Keep the supplied colors, transparency, proportions, orientation, format, glow, and crisp pixel edges unchanged. Use motifs as occasional signatures, not as gap fillers, and do not casually introduce another miniature illustration style.
