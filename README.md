# Threaded Olive

Threaded Olive is a portfolio-first fiber arts website with a built-in Studio Journal. The current v1 is centered on crochet and makes room for sewing, knitting, embroidery, and needlepoint.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local MDX content for portfolio projects and journal posts

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

- Portfolio projects live in `content/projects/*.mdx`
- Studio Journal posts live in `content/journal/*.mdx`
- Frontmatter expectations and image notes live in `content/README.md`

The placeholder image objects already support a future `src`, `width`, and `height`, so you can swap in real photography later without changing the page components.

## Primary routes

- `/`
- `/portfolio`
- `/portfolio/[slug]`
- `/journal`
- `/journal/[slug]`
- `/about`
- `/contact`

## Verification

```bash
npm run lint
npm run build
```
