import type { Craft } from "@/lib/types";

export type PortableTextValue = Array<Record<string, unknown>>;

export interface SanityImage {
  _type: "image";
  alt?: string;
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  } | null;
}

export interface NavigationConfigItem {
  _key: string;
  itemType: "home" | "about";
  label: string;
  order: number;
}

export interface NavigationItem {
  key: string;
  href: string;
  label: string;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImage | null;
  additionalImages: SanityImage[];
  craftType?: Craft | null;
  completionDate?: string | null;
  storyBehindTheMake?: PortableTextValue | null;
  materialsOrYarn?: string | null;
  patternName?: string | null;
  patternDesigner?: string | null;
  patternUrl?: string | null;
  toolSize?: string | null;
  modifications?: string | null;
  processNotes?: string | null;
  displayOrder: number;
  featured?: boolean | null;
}

export interface AboutPage {
  introductoryText?: string | null;
  photos: SanityImage[];
  brandStory?: PortableTextValue | null;
  instagramUrl?: string | null;
  pinterestUrl?: string | null;
}

export interface RichTextSection {
  _key: string;
  _type: "richTextSection";
  title?: string | null;
  body?: PortableTextValue | null;
}

export interface ImageSection {
  _key: string;
  _type: "imageSection";
  title?: string | null;
  image?: SanityImage | null;
  caption?: string | null;
}

export interface ImageGallerySection {
  _key: string;
  _type: "imageGallerySection";
  title?: string | null;
  images: SanityImage[];
  caption?: string | null;
}

export interface LinkListItem {
  _key: string;
  label: string;
  url: string;
}

export interface LinkListSection {
  _key: string;
  _type: "linkListSection";
  title?: string | null;
  items: LinkListItem[];
}

export interface SimpleItemGridItem {
  _key: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  url?: string | null;
}

export interface SimpleItemGridSection {
  _key: string;
  _type: "simpleItemGridSection";
  title?: string | null;
  items: SimpleItemGridItem[];
}

export type FlexibleSection =
  | RichTextSection
  | ImageSection
  | ImageGallerySection
  | LinkListSection
  | SimpleItemGridSection;

export interface FlexiblePage {
  _id: string;
  pageTitle: string;
  slug: string;
  introductoryText?: string | null;
  featuredImage?: SanityImage | null;
  showInNavigation?: boolean | null;
  navigationLabel?: string | null;
  navigationOrder?: number | null;
  sections: FlexibleSection[];
}

export interface SiteSettings {
  siteName?: string | null;
  shortDescription?: string | null;
  logo?: SanityImage | null;
  instagramUrl?: string | null;
  pinterestUrl?: string | null;
  navigationConfiguration?: NavigationConfigItem[] | null;
}

export interface SiteShellData {
  siteName: string;
  shortDescription: string;
  logo?: SanityImage | null;
  instagramUrl?: string | null;
  pinterestUrl?: string | null;
  navigation: NavigationItem[];
}
