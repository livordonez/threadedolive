import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  initialValue: {
    introductoryText:
      "Threaded Olive is a place to share handmade projects, process, and the stories behind each make.",
  },
  fields: [
    defineField({
      name: "introductoryText",
      title: "Introductory text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "photos",
      title: "Photos",
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
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "brandStory",
      title: "Threaded Olive brand story",
      type: "portableText",
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
  ],
});
