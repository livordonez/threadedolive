import { defineArrayMember, defineField, defineType } from "sanity";

export const simpleItemGridSectionType = defineType({
  name: "simpleItemGridSection",
  title: "Simple item grid",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "simpleGridItem" })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Simple item grid section",
      };
    },
  },
});
