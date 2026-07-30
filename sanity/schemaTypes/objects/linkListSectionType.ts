import { defineArrayMember, defineField, defineType } from "sanity";

export const linkListSectionType = defineType({
  name: "linkListSection",
  title: "Link list",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "linkListItem" })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Link list section",
      };
    },
  },
});
