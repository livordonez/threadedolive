import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  initialValue: {
    siteName: "Threaded Olive",
    shortDescription:
      "A handmade archive for thoughtful fiber projects and the stories behind the make.",
    navigationConfiguration: [
      {
        _key: "home-navigation",
        itemType: "home",
        label: "Home",
        order: 0,
      },
      {
        _key: "about-navigation",
        itemType: "about",
        label: "About",
        order: 10,
      },
    ],
  },
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo placeholder",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "pinterestUrl",
      title: "Pinterest URL",
      type: "url",
    }),
    defineField({
      name: "navigationConfiguration",
      title: "Navigation configuration",
      type: "array",
      of: [defineArrayMember({ type: "coreNavigationItem" })],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!Array.isArray(value)) {
            return true;
          }

          const itemTypes = value
            .map(
              (item) => (item as { itemType?: string } | undefined)?.itemType,
            )
            .filter(Boolean) as string[];

          return new Set(itemTypes).size === itemTypes.length
            ? true
            : "Each core navigation item can only appear once.";
        }),
    }),
  ],
});
