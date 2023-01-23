import { colorList } from "PageBuilder/schemaHelper/snippets";
import { defineField, defineArrayMember, defineType } from "sanity";

export const imageGalleryPlugSchema = defineType({
  title: "Image Gallery",
  name: "imageGalleryPlug",
  type: "object",

  fields: [
    { name: "name", title: "title", type: "string" },
    defineField({
      name: "items",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "imageGalleryItem" })],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "number",
      initialValue: 4,
      validation: (Rule) => Rule.required().integer().min(1).max(8),
      hidden: ({ parent }) => parent?.variant === "carousel",
    }),
    defineField({
      name: "rows_mobile",
      title: "Rows Mobile",
      type: "number",
      initialValue: 2,
      validation: (Rule) => Rule.required().integer().min(1).max(8),
      hidden: ({ parent }) => parent?.variant === "carousel",
    }),
    {
      name: "ratio",
      title: "Ratio",
      type: "string",
      initialValue: "1:1",
      options: {
        list: ["1:1", "16:9", "2:3", "3:2"],
      },
      hidden: ({ parent }) => parent?.variant === "carousel",
    },
    {
      name: "variant",
      title: "Variation",
      type: "string",

      options: {
        list: [
          { title: "Grid (default)", value: "grid" },
          { title: "Carousel", value: "carousel" },
        ],
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      items: "items",
    },

    prepare({ name }: any) {
      return {
        title: "ImageGallery: " + name,
      };
    },
  },
});

export const imageGalleryPlugItemSchema = defineType({
  title: "Image Gallery Item",
  name: "imageGalleryItem",
  type: "object",

  fields: [
    { name: "title", title: "title", type: "text" },

    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    { name: "contain", title: "Überlagern", type: "boolean" },

    {
      title: "Background Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [...colorList()],
      },
    },

    { name: "link", title: "Link", type: "link" },

    {
      name: "size",
      title: "Size",
      type: "string",
      initialValue: "m",
      options: {
        list: ["m", "l"],
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      image: "image",
    },
    prepare({ name, image }) {
      return {
        title: "ImageGallery: " + name,
        media: image,
      };
    },
  },
});
