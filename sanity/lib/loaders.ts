import { siteConfig } from "@/lib/site";
import { isSanityConfigured } from "@/sanity/lib/env";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
  FLEXIBLE_PAGE_BY_SLUG_QUERY,
  NAVIGATION_PAGES_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  AboutPage,
  FlexiblePage,
  NavigationItem,
  Project,
  SiteSettings,
  SiteShellData,
} from "@/sanity/lib/types";

const fallbackNavigation: NavigationItem[] = siteConfig.defaultNavigation.map(
  (item) => ({
    key: item.href,
    href: item.href,
    label: item.label,
    order: item.order,
  }),
);

const fallbackAboutPage: AboutPage = {
  introductoryText:
    "Threaded Olive is a warm, evolving home for handmade projects and the stories that shape them.",
  photos: [],
  brandStory: [
    {
      _key: "fallback-brand-story",
      _type: "block",
      children: [
        {
          _key: "fallback-brand-story-span",
          _type: "span",
          text: "Use Sanity Studio to add your photos, brand story, and links once your project is connected.",
          marks: [],
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  instagramUrl: siteConfig.placeholderInstagramUrl,
  pinterestUrl: siteConfig.placeholderPinterestUrl,
};

function sortNavigation(items: NavigationItem[]) {
  return [...items].sort((left, right) => {
    if (left.order === right.order) {
      return left.label.localeCompare(right.label);
    }

    return left.order - right.order;
  });
}

function mergeNavigation(settings: SiteSettings | null, pages: FlexiblePage[]) {
  const configuredCoreItems =
    settings?.navigationConfiguration
      ?.map((item) => ({
        key: item._key,
        href: item.itemType === "home" ? "/" : "/about",
        label:
          item.label ||
          (item.itemType === "home"
            ? siteConfig.defaultNavigation[0].label
            : siteConfig.defaultNavigation[1].label),
        order: item.order ?? 0,
      }))
      .filter((item) => Boolean(item.label)) ?? [];

  const coreItems =
    configuredCoreItems.length > 0 ? configuredCoreItems : fallbackNavigation;
  const flexibleItems = pages
    .filter((page) => page.slug)
    .map((page) => ({
      key: page._id,
      href: `/${page.slug}`,
      label: page.navigationLabel || page.pageTitle,
      order: page.navigationOrder ?? 9999,
    }));

  return sortNavigation([...coreItems, ...flexibleItems]);
}

export async function getProjects(): Promise<Project[]> {
  "use cache";

  if (!isSanityConfigured) {
    return [];
  }

  const { data } = await sanityFetch({
    query: PROJECTS_QUERY,
  });

  return (data as Project[] | null) ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  "use cache";

  if (!isSanityConfigured) {
    return null;
  }

  const { data } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });

  return (data as Project | null) ?? null;
}

export async function getAboutPage(): Promise<AboutPage> {
  "use cache";

  if (!isSanityConfigured) {
    return fallbackAboutPage;
  }

  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
  });

  if (!data) {
    return fallbackAboutPage;
  }

  const aboutPage = data as AboutPage;

  return {
    ...fallbackAboutPage,
    ...aboutPage,
    photos:
      aboutPage.photos && aboutPage.photos.length > 0
        ? aboutPage.photos
        : fallbackAboutPage.photos,
  };
}

export async function getFlexiblePageBySlug(
  slug: string,
): Promise<FlexiblePage | null> {
  "use cache";

  if (!isSanityConfigured) {
    return null;
  }

  const { data } = await sanityFetch({
    query: FLEXIBLE_PAGE_BY_SLUG_QUERY,
    params: { slug },
  });

  return (data as FlexiblePage | null) ?? null;
}

export async function getSiteShellData(): Promise<SiteShellData> {
  "use cache";

  if (!isSanityConfigured) {
    return {
      siteName: siteConfig.name,
      shortDescription: siteConfig.description,
      instagramUrl: siteConfig.placeholderInstagramUrl,
      pinterestUrl: siteConfig.placeholderPinterestUrl,
      navigation: fallbackNavigation,
    };
  }

  const [{ data: settingsData }, { data: pagesData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: NAVIGATION_PAGES_QUERY }),
  ]);

  const settings = (settingsData as SiteSettings | null) ?? null;
  const pages = (pagesData as FlexiblePage[] | null) ?? [];

  return {
    siteName: settings?.siteName || siteConfig.name,
    shortDescription: settings?.shortDescription || siteConfig.description,
    logo: settings?.logo,
    instagramUrl: settings?.instagramUrl || siteConfig.placeholderInstagramUrl,
    pinterestUrl: settings?.pinterestUrl || siteConfig.placeholderPinterestUrl,
    navigation: mergeNavigation(settings, pages),
  };
}
