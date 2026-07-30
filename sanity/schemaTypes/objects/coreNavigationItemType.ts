import { defineField, defineType } from "sanity";

export const coreNavigationItemType = defineType({
  name: "coreNavigationItem",
  title: "Core navigation item",
  type: "object",
  fields: [
    defineField({
      name: "itemType",
      title: "Navigation item",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "itemType",
    },
  },
});
