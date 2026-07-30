import { defineQuery } from "next-sanity";

const IMAGE_PROJECTION = `
  ...,
  alt,
  asset->{
    _id,
    url,
    metadata{
      dimensions{
        width,
        height,
        aspectRatio
      }
    }
  }
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(displayOrder asc, completionDate desc){
    _id,
    title,
    "slug": slug.current,
    mainImage{${IMAGE_PROJECTION}},
    additionalImages[]{${IMAGE_PROJECTION}},
    craftType,
    completionDate,
    storyBehindTheMake,
    materialsOrYarn,
    patternName,
    patternDesigner,
    patternUrl,
    toolSize,
    modifications,
    processNotes,
    displayOrder,
    featured
  }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    mainImage{${IMAGE_PROJECTION}},
    additionalImages[]{${IMAGE_PROJECTION}},
    craftType,
    completionDate,
    storyBehindTheMake,
    materialsOrYarn,
    patternName,
    patternDesigner,
    patternUrl,
    toolSize,
    modifications,
    processNotes,
    displayOrder,
    featured
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    introductoryText,
    photos[]{${IMAGE_PROJECTION}},
    brandStory,
    instagramUrl,
    pinterestUrl
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    shortDescription,
    logo{${IMAGE_PROJECTION}},
    instagramUrl,
    pinterestUrl,
    navigationConfiguration[]{
      _key,
      itemType,
      label,
      order
    }
  }
`);

export const NAVIGATION_PAGES_QUERY = defineQuery(`
  *[
    _type == "flexiblePage" &&
    showInNavigation == true &&
    defined(slug.current)
  ] | order(coalesce(navigationOrder, 9999) asc, pageTitle asc){
    _id,
    pageTitle,
    "slug": slug.current,
    showInNavigation,
    navigationLabel,
    navigationOrder
  }
`);

export const FLEXIBLE_PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "flexiblePage" && slug.current == $slug][0]{
    _id,
    pageTitle,
    "slug": slug.current,
    introductoryText,
    featuredImage{${IMAGE_PROJECTION}},
    showInNavigation,
    navigationLabel,
    navigationOrder,
    sections[]{
      ...,
      image{${IMAGE_PROJECTION}},
      images[]{${IMAGE_PROJECTION}}
    }
  }
`);
