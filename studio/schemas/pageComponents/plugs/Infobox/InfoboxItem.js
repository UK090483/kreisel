import { colorList } from "../../../snippets";

export default {
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
};
