import { defineType } from "sanity";

export const infoblockPlug = defineType({
  title: "Info Box",
  name: "infoBox",
  type: "object",

  fields: [
    { name: "name", title: "title", type: "string" },
    {
      name: "items",
      title: "Images",
      type: "array",
      of: [{ type: "infoBoxItem" }],
    },
    {
      name: "rows",
      title: "Rows",
      type: "number",
      initialValue: 4,
      validation: (Rule) => Rule.required().integer().min(1).max(8),
    },
    // {
    //   name: "rows_mobile",
    //   title: "Rows Mobile",
    //   type: "number",
    //   initialValue: 2,
    //   validation: (Rule) => Rule.required().integer().min(1).max(8),
    // },
    // {
    //   name: "ratio",
    //   title: "Ratio",
    //   type: "string",
    //   initialValue: "1:1",
    //   options: {
    //     list: ["1:1", "16:9", "2:3", "3:2"],
    //   },
    // },
    // {
    //   name: "variation",
    //   title: "Variation",
    //   type: "string",

    //   options: {
    //     list: [
    //       { title: "Grid", value: "grid" },
    //       { title: "List", value: "list" },
    //     ],
    //   },
    // },
  ],
  preview: {
    select: {
      name: "name",
      items: "items",
    },

    prepare({ name }) {
      return {
        title: "InfoBox: " + name,
      };
    },
  },
});

export const infoblockPlugItem = defineType({
  title: "Image Gallery Item",
  name: "infoBoxItem",
  type: "object",

  fields: [
    { name: "title", title: "title", type: "text" },

    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",

          fields: [{ name: "content", title: "Content", type: "easyRichText" }],
        },
      ],
    },

    {
      title: "Background Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [
          { title: "Rot", value: "red" },
          { title: "Blau", value: "blue" },
          { title: "Gelb", value: "yellow" },
          { title: "Grün", value: "green" },
        ],
      },
    },

    // { name: "link", title: "Link", type: "link" },
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title, image }) {
      return {
        title: title,
        media: image,
      };
    },
  },
});
