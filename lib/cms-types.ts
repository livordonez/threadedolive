export type PublishStatus = "draft" | "published";

export type CmsImage = {
  url: string;
  path: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Make = {
  id: string;
  slug: string;
  title: string;
  craft_type: string;
  completion_date: string | null;
  story: string;
  materials: string;
  pattern: string;
  pattern_designer: string;
  pattern_link: string;
  tool_size: string;
  modifications: string;
  process_notes: string;
  lessons: string;
  images: CmsImage[];
  status: PublishStatus;
  display_order: number;
  published_at: string | null;
  updated_at: string;
};

export type Muse = {
  id: string;
  title: string;
  category: string;
  note: string;
  source_name: string;
  source_url: string;
  images: CmsImage[];
  status: PublishStatus;
  display_order: number;
  published_at: string | null;
  updated_at: string;
};

export type FavoriteFollowRecord = {
  id: string;
  name: string;
  url: string;
  avatar: CmsImage | null;
  description: string;
  handle: string;
  youtube_channel_id: string;
  display_order: number;
  visible: boolean;
  updated_at: string;
};

export type Moment = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  moment_date: string;
  images: CmsImage[];
  status: PublishStatus;
  published_at: string | null;
  updated_at: string;
};

export type CardItem = {
  title: string;
  text?: string;
  url?: string;
  image?: CmsImage;
};

export type LinkItem = { label: string; url: string; description?: string };

export type PageSection = {
  id: string;
  type: "rich_text" | "image" | "gallery" | "cards" | "links" | "heading" | "divider";
  heading?: string;
  body?: string;
  image?: CmsImage;
  images?: CmsImage[];
  items?: CardItem[];
  links?: LinkItem[];
};

export type FlexiblePage = {
  id: string;
  slug: string;
  title: string;
  introduction: string;
  sections: PageSection[];
  status: PublishStatus;
  show_in_navigation: boolean;
  navigation_label: string;
  published_at: string | null;
  updated_at: string;
};

export type AboutContent = {
  id: string;
  bio: string;
  story: string;
  images: CmsImage[];
  instagram_url: string;
  pinterest_url: string;
};

export type SiteSettings = {
  id: string;
  site_name: string;
  short_description: string;
  instagram_url: string;
  pinterest_url: string;
  footer_text: string;
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  display_order: number;
  page_id: string | null;
};
