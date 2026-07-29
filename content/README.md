# Threaded Olive Content

The site reads portfolio projects from `content/projects/*.mdx` and Studio Journal posts from `content/journal/*.mdx`.

## Projects

Required frontmatter fields:

- `slug`
- `title`
- `craft`
- `completedOn`
- `excerpt`
- `featuredImage`
- `galleryImages`
- `story`
- `materials`
- `techniques`
- `processNotes`
- `relatedProjects`
- `featured`

Optional frontmatter fields:

- `patternInfo`
- `dimensions`

## Journal posts

Required frontmatter fields:

- `slug`
- `title`
- `publishedOn`
- `category`
- `excerpt`
- `featuredImage`
- `featured`

Optional frontmatter fields:

- `relatedProjects`

## Images

Each `featuredImage` or `galleryImages` entry can stay placeholder-only:

```yaml
featuredImage:
  label: Olive stitch throw featured image
  alt: Placeholder for the olive stitch throw
  tone: olive
```

Or grow into a real image later:

```yaml
featuredImage:
  label: Olive stitch throw featured image
  alt: Olive stitch throw draped across a chair
  tone: olive
  src: /images/olive-stitch-throw/hero.jpg
  width: 1600
  height: 2000
```

The page components do not need to change when you replace placeholders with real images.
