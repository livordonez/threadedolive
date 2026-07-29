export const crafts = [
  "Crochet",
  "Sewing",
  "Knitting",
  "Embroidery",
  "Needlepoint",
] as const;

export const portfolioFilters = ["All", ...crafts] as const;

export const journalCategories = [
  "Works in Progress",
  "Finished Objects",
  "Learning a New Craft",
  "Patterns and Process",
  "Materials and Tools",
  "Studio Notes",
] as const;

export const placeholderTones = [
  "olive",
  "linen",
  "pimento",
  "brass",
  "charcoal",
] as const;

export type Craft = (typeof crafts)[number];
export type PortfolioFilter = (typeof portfolioFilters)[number];
export type JournalCategory = (typeof journalCategories)[number];
export type PlaceholderTone = (typeof placeholderTones)[number];

export interface ContentImage {
  label: string;
  alt: string;
  tone: PlaceholderTone;
  src?: string;
  width?: number;
  height?: number;
  objectPosition?: string;
}

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  craft: Craft;
  completedOn: string;
  excerpt: string;
  featuredImage: ContentImage;
  galleryImages: ContentImage[];
  story: string;
  materials: string[];
  techniques: string[];
  patternInfo?: string;
  dimensions?: string;
  processNotes: string[];
  relatedProjects: string[];
  featured: boolean;
}

export interface ProjectEntry extends ProjectFrontmatter {
  body: string;
}

export type ProjectSummary = ProjectFrontmatter;

export interface JournalFrontmatter {
  slug: string;
  title: string;
  publishedOn: string;
  category: JournalCategory;
  excerpt: string;
  featuredImage: ContentImage;
  relatedProjects?: string[];
  featured: boolean;
}

export interface JournalEntry extends JournalFrontmatter {
  body: string;
}

export type JournalSummary = JournalFrontmatter;
