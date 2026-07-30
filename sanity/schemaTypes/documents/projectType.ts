import { defineArrayMember, defineField, defineType } from "sanity";
import { crafts } from "../../../lib/types";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "additionalImages",
      title: "Additional images",
      type: "array",
      of: [
        defineArrayMember({
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
      ],
    }),
    defineField({
      name: "craftType",
      title: "Craft type",
      type: "string",
      options: {
        list: crafts.map((craft) => ({ title: craft, value: craft })),
      },
    }),
    defineField({
      name: "completionDate",
      title: "Completion date",
      type: "date",
    }),
    defineField({
      name: "storyBehindTheMake",
      title: "Story behind the make",
      type: "portableText",
    }),
    defineField({
      name: "materialsOrYarn",
      title: "Materials or yarn",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "patternName",
      title: "Pattern name",
      type: "string",
    }),
    defineField({
      name: "patternDesigner",
      title: "Pattern designer",
      type: "string",
    }),
    defineField({
      name: "patternUrl",
      title: "Pattern URL",
      type: "url",
    }),
    defineField({
      name: "toolSize",
      title: "Hook, needle, or tool size",
      type: "string",
    }),
    defineField({
      name: "modifications",
      title: "Modifications",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "processNotes",
      title: "Process notes",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "craftType",
    },
  },
});
