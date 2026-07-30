# Threaded Olive

Threaded Olive is a Sanity-backed handmade portfolio built with Next.js. This phase focuses on the content foundation: a photo-led homepage, story-driven project pages, an editable About page, flexible standalone pages, and an embedded Sanity Studio at `/studio`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity Studio embedded in the Next.js app
- `next-sanity` with Cache Components-enabled live revalidation for published content

## Sanity setup

The app expects these environment variables:

```bash
cp .env.example .env.local
```

Then complete the interactive Sanity project setup inside this repo:

```bash
npx sanity@latest init
```

During the prompts:

- Sign in to your Sanity account
- Create or connect the project named `Threaded Olive`
- Use the `production` dataset
- Keep the embedded Studio route at `/studio`

After setup, add the generated project ID to `.env.local`.

If Sanity asks for local CORS access for the embedded Studio, run:

```bash
npx sanity cors add http://localhost:3000 --credentials
```

## Local development

Run the site and embedded Studio together with one command:

```bash
npm run dev
```

Then open:

- Site: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Primary routes

- `/`
- `/makes/[slug]`
- `/about`
- `/[slug]`
- `/studio`

Legacy routes redirect:

- `/portfolio` -> `/`
- `/portfolio/[slug]` -> `/makes/[slug]`
- `/journal` -> `/`
- `/journal/[slug]` -> `/`
- `/contact` -> `/about`

## Content model

Sanity Studio includes:

- `Project`
- `About` singleton
- `Flexible Page`
- `Site Settings` singleton

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
