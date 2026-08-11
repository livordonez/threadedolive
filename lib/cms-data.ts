import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type {
  AboutContent,
  FlexiblePage,
  Make,
  Moment,
  Muse,
  NavigationItem,
  SiteSettings,
} from "@/lib/cms-types";

const coreNavigation: NavigationItem[] = [
  { id: "fallback-home", label: "Home", href: "/", visible: true, display_order: 0, page_id: null },
  { id: "fallback-makes", label: "Makes", href: "/makes", visible: true, display_order: 1, page_id: null },
  { id: "fallback-muses", label: "Muses", href: "/muses", visible: true, display_order: 2, page_id: null },
  { id: "fallback-about", label: "About", href: "/about", visible: true, display_order: 3, page_id: null },
];
const navigationConfiguredHref = "/__navigation-configured";

export const defaultSettings: SiteSettings = {
  id: "default",
  site_name: "The Threaded Olive",
  short_description: "Things I make, wear, read & love.",
  instagram_url: "https://www.instagram.com/liv_ordonez/",
  pinterest_url: "https://www.pinterest.com/liv_ordonez/",
  footer_text: "Made slowly and shared thoughtfully.",
};

export const defaultAbout: AboutContent = {
  id: "default",
  bio: "",
  story: "",
  images: [],
  instagram_url: "https://www.instagram.com/liv_ordonez/",
  pinterest_url: "https://www.pinterest.com/liv_ordonez/",
};

function rows<T>(data: unknown): T[] {
  return (data ?? []) as T[];
}

function withCoreNavigation(items: NavigationItem[]) {
  const hasConfigurationMarker = items.some((item) => item.href === navigationConfiguredHref);
  const publicItems = items.filter((item) => item.href !== navigationConfiguredHref);
  if (hasConfigurationMarker) {
    return [...publicItems].sort((a, b) => a.display_order - b.display_order);
  }

  const byHref = new Map(publicItems.map((item) => [item.href, item]));
  const hasEveryCoreItem = coreNavigation.every((item) => byHref.has(item.href));
  if (hasEveryCoreItem) return [...publicItems].sort((a, b) => a.display_order - b.display_order);

  const coreHrefs = new Set(coreNavigation.map((item) => item.href));
  const completedCore = coreNavigation.map((fallback) => ({
    ...fallback,
    ...byHref.get(fallback.href),
    display_order: fallback.display_order,
  }));
  const additionalItems = publicItems
    .filter((item) => !coreHrefs.has(item.href))
    .sort((a, b) => a.display_order - b.display_order)
    .map((item, index) => ({ ...item, display_order: coreNavigation.length + index }));

  return [...completedCore, ...additionalItems];
}

export async function getPublishedMakes() {
  if (!isSupabaseConfigured()) return [] as Make[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("makes")
    .select("*")
    .eq("status", "published")
    .order("display_order")
    .order("published_at", { ascending: false });
  return rows<Make>(data);
}

export async function getMakeBySlug(slug: string, includeDraft = false) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("makes").select("*").eq("slug", slug);
  if (!includeDraft) query = query.eq("status", "published");
  const { data } = await query.maybeSingle();
  return data as Make | null;
}

export async function getAllMakes() {
  if (!isSupabaseConfigured()) return [] as Make[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("makes")
    .select("*")
    .order("display_order")
    .order("updated_at", { ascending: false });
  return rows<Make>(data);
}

export async function getPublishedMuses() {
  if (!isSupabaseConfigured()) return [] as Muse[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("muses").select("*").eq("status", "published").order("display_order").order("published_at", { ascending: false });
  return rows<Muse>(data);
}

export async function getAllMuses() {
  if (!isSupabaseConfigured()) return [] as Muse[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("muses").select("*").order("display_order").order("updated_at", { ascending: false });
  return rows<Muse>(data);
}

export async function getMuseById(id: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("muses").select("*").eq("id", id).maybeSingle();
  return data as Muse | null;
}

export async function getPublishedMoments() {
  if (!isSupabaseConfigured()) return [] as Moment[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("moments").select("*").eq("status", "published").order("moment_date", { ascending: false });
  return rows<Moment>(data);
}

export async function getAllMoments() {
  if (!isSupabaseConfigured()) return [] as Moment[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("moments").select("*").order("moment_date", { ascending: false });
  return rows<Moment>(data);
}

export async function getMomentById(id: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("moments").select("*").eq("id", id).maybeSingle();
  return data as Moment | null;
}

export async function getMomentBySlug(slug: string, includeDraft = false) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("moments").select("*").eq("slug", slug);
  if (!includeDraft) query = query.eq("status", "published");
  const { data } = await query.maybeSingle();
  return data as Moment | null;
}

export async function getPublishedPage(slug: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data as FlexiblePage | null;
}

export async function getPageBySlug(slug: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("pages").select("*").eq("slug", slug).maybeSingle();
  return data as FlexiblePage | null;
}

export async function getPageById(id: string) {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("pages").select("*").eq("id", id).maybeSingle();
  return data as FlexiblePage | null;
}

export async function getAllPages() {
  if (!isSupabaseConfigured()) return [] as FlexiblePage[];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("pages").select("*").order("updated_at", { ascending: false });
  return rows<FlexiblePage>(data);
}

export async function getAbout() {
  if (!isSupabaseConfigured()) return defaultAbout;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("about_content").select("*").maybeSingle();
  const about = data as AboutContent | null;
  return about ? {
    ...about,
    instagram_url: about.instagram_url || defaultAbout.instagram_url,
    pinterest_url: about.pinterest_url || defaultAbout.pinterest_url,
  } : defaultAbout;
}

export async function getSettings() {
  if (!isSupabaseConfigured()) return defaultSettings;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("site_settings").select("*").maybeSingle();
  const settings = data as SiteSettings | null;
  return settings ? {
    ...settings,
    site_name: settings.site_name === "Threaded Olive" ? defaultSettings.site_name : settings.site_name,
    short_description:
      settings.short_description === "A thoughtful archive of handmade fiber arts."
        ? defaultSettings.short_description
        : settings.short_description,
    instagram_url: settings.instagram_url || defaultSettings.instagram_url,
    pinterest_url: settings.pinterest_url || defaultSettings.pinterest_url,
  } : defaultSettings;
}

export async function getNavigation(includeHidden = false) {
  if (!isSupabaseConfigured()) return coreNavigation;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("navigation_items").select("*").order("display_order");
  const navigation = withCoreNavigation(rows<NavigationItem>(data));
  return includeHidden
    ? navigation
    : navigation.filter((item) => item.visible && item.href !== "/moments");
}
