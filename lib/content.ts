import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  crafts,
  journalCategories,
  type ContentImage,
  type Craft,
  type JournalCategory,
  type JournalEntry,
  type JournalSummary,
  type ProjectEntry,
  type ProjectSummary,
} from "@/lib/types";
import {
  isCraft,
  isPlaceholderTone,
  normalizeDate,
  sortByDateDesc,
} from "@/lib/utils";

const contentRoot = path.join(process.cwd(), "content");
const projectsRoot = path.join(contentRoot, "projects");
const journalRoot = path.join(contentRoot, "journal");

function isJournalCategory(value: unknown): value is JournalCategory {
  return (
    typeof value === "string" &&
    journalCategories.includes(value as JournalCategory)
  );
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

function normalizeImage(value: unknown, fallbackLabel: string): ContentImage {
  const image = typeof value === "object" && value !== null ? value : {};
  const candidate = image as Record<string, unknown>;

  return {
    label:
      typeof candidate.label === "string" ? candidate.label : fallbackLabel,
    alt:
      typeof candidate.alt === "string"
        ? candidate.alt
        : `${fallbackLabel} placeholder`,
    tone: isPlaceholderTone(candidate.tone) ? candidate.tone : "linen",
    src: typeof candidate.src === "string" ? candidate.src : undefined,
    width: typeof candidate.width === "number" ? candidate.width : undefined,
    height: typeof candidate.height === "number" ? candidate.height : undefined,
    objectPosition:
      typeof candidate.objectPosition === "string"
        ? candidate.objectPosition
        : undefined,
  };
}

function parseProject(fileName: string, source: string): ProjectEntry {
  const { data, content } = matter(source);
  const slug = typeof data.slug === "string" ? data.slug : fileName.replace(/\.mdx$/, "");
  const title =
    typeof data.title === "string" ? data.title : "Untitled project";
  const craft: Craft = isCraft(data.craft) ? data.craft : crafts[0];
  const completedOn = normalizeDate(data.completedOn, "2026-01-01");

  return {
    slug,
    title,
    craft,
    completedOn,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    featuredImage: normalizeImage(
      data.featuredImage,
      `${title} featured image`,
    ),
    galleryImages: Array.isArray(data.galleryImages)
      ? data.galleryImages.map((image, index) =>
          normalizeImage(image, `${title} gallery image ${index + 1}`),
        )
      : [],
    story: typeof data.story === "string" ? data.story : "",
    materials: normalizeStringArray(data.materials),
    techniques: normalizeStringArray(data.techniques),
    patternInfo:
      typeof data.patternInfo === "string" ? data.patternInfo : undefined,
    dimensions:
      typeof data.dimensions === "string" ? data.dimensions : undefined,
    processNotes: normalizeStringArray(data.processNotes),
    relatedProjects: normalizeStringArray(data.relatedProjects),
    featured: Boolean(data.featured),
    body: content.trim(),
  };
}

function parseJournal(fileName: string, source: string): JournalEntry {
  const { data, content } = matter(source);
  const slug = typeof data.slug === "string" ? data.slug : fileName.replace(/\.mdx$/, "");
  const title = typeof data.title === "string" ? data.title : "Untitled entry";

  return {
    slug,
    title,
    publishedOn: normalizeDate(data.publishedOn, "2026-01-01"),
    category: isJournalCategory(data.category)
      ? data.category
      : journalCategories[0],
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    featuredImage: normalizeImage(
      data.featuredImage,
      `${title} featured image`,
    ),
    relatedProjects: normalizeStringArray(data.relatedProjects),
    featured: Boolean(data.featured),
    body: content.trim(),
  };
}

async function readCollection(directory: string) {
  try {
    const files = await fs.readdir(directory);
    return files.filter((fileName) => fileName.endsWith(".mdx"));
  } catch {
    return [];
  }
}

async function readEntry(directory: string, fileName: string) {
  return fs.readFile(path.join(directory, fileName), "utf8");
}

function toProjectSummary(project: ProjectEntry): ProjectSummary {
  return {
    slug: project.slug,
    title: project.title,
    craft: project.craft,
    completedOn: project.completedOn,
    excerpt: project.excerpt,
    featuredImage: project.featuredImage,
    galleryImages: project.galleryImages,
    story: project.story,
    materials: project.materials,
    techniques: project.techniques,
    patternInfo: project.patternInfo,
    dimensions: project.dimensions,
    processNotes: project.processNotes,
    relatedProjects: project.relatedProjects,
    featured: project.featured,
  };
}

function toJournalSummary(post: JournalEntry): JournalSummary {
  return {
    slug: post.slug,
    title: post.title,
    publishedOn: post.publishedOn,
    category: post.category,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    relatedProjects: post.relatedProjects,
    featured: post.featured,
  };
}

export const getProjects = cache(async (): Promise<ProjectEntry[]> => {
  const files = await readCollection(projectsRoot);
  const projects: ProjectEntry[] = await Promise.all(
    files.map(async (fileName) => parseProject(fileName, await readEntry(projectsRoot, fileName))),
  );

  return sortByDateDesc(projects, "completedOn");
});

export const getProjectSummaries = cache(async (): Promise<ProjectSummary[]> => {
  const projects = await getProjects();
  return projects.map(toProjectSummary);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectEntry | null> => {
    const projects = await getProjects();
    return projects.find((project) => project.slug === slug) ?? null;
  },
);

export const getJournalPosts = cache(async (): Promise<JournalEntry[]> => {
  const files = await readCollection(journalRoot);
  const posts: JournalEntry[] = await Promise.all(
    files.map(async (fileName) => parseJournal(fileName, await readEntry(journalRoot, fileName))),
  );

  return sortByDateDesc(posts, "publishedOn");
});

export const getJournalSummaries = cache(async (): Promise<JournalSummary[]> => {
  const posts = await getJournalPosts();
  return posts.map(toJournalSummary);
});

export const getJournalPostBySlug = cache(
  async (slug: string): Promise<JournalEntry | null> => {
    const posts = await getJournalPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  },
);
