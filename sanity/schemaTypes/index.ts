import { aboutPageType } from "./documents/aboutPageType";
import { flexiblePageType } from "./documents/flexiblePageType";
import { projectType } from "./documents/projectType";
import { siteSettingsType } from "./documents/siteSettingsType";
import { coreNavigationItemType } from "./objects/coreNavigationItemType";
import { imageGallerySectionType } from "./objects/imageGallerySectionType";
import { imageSectionType } from "./objects/imageSectionType";
import { linkListItemType } from "./objects/linkListItemType";
import { linkListSectionType } from "./objects/linkListSectionType";
import { portableTextType } from "./objects/portableTextType";
import { richTextSectionType } from "./objects/richTextSectionType";
import { simpleGridItemType } from "./objects/simpleGridItemType";
import { simpleItemGridSectionType } from "./objects/simpleItemGridSectionType";

export const schemaTypes = [
  portableTextType,
  coreNavigationItemType,
  linkListItemType,
  simpleGridItemType,
  richTextSectionType,
  imageSectionType,
  imageGallerySectionType,
  linkListSectionType,
  simpleItemGridSectionType,
  projectType,
  aboutPageType,
  flexiblePageType,
  siteSettingsType,
];
