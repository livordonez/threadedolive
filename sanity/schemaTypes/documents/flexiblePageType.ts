import { defineArrayMember, defineField, defineType } from "sanity";

const reservedSlugs = new Set(["about", "studio", "makes"]);

export const flexiblePageType = defineType({
  name: "flexiblePage",
  title: "Flexible Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "pageTitle",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const current = value?.current?.trim().toLowerCase();

          if (current && reservedSlugs.has(current)) {
            return "This slug is reserved by an existing route.";
          }

          return true;
        }),
    }),
    defineField({
      name: "introductoryText",
      title: "Introductory text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
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
      name: "showInNavigation",
      title: "Show in navigation",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "navigationLabel",
      title: "Navigation label",
      type: "string",
      hidden: ({ document }) => !document?.showInNavigation,
    }),
    defineField({
      name: "navigationOrder",
      title: "Navigation order",
      type: "number",
      hidden: ({ document }) => !document?.showInNavigation,
    }),
    defineField({
      name: "sections",
      title: "Flexible sections",
      type: "array",
      of: [
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "imageSection" }),
        defineArrayMember({ type: "imageGallerySection" }),
        defineArrayMember({ type: "linkListSection" }),
        defineArrayMember({ type: "simpleItemGridSection" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "pageTitle",
      subtitle: "slug.current",
      media: "featuredImage",
    },
  },
});
