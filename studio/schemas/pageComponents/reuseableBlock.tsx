import { colorList, sizesList } from "../snippets";

export default {
  name: "reusable",
  type: "object",
  title: "Reusable Block",

  fields: [
    {
      title: "Block",
      name: "item",
      type: "reference",
      to: [{ type: "reuseAble" }],
    },
  ],
  preview: {
    select: {
      image: "image",
      content: "content",
      bgColor: "bgColor",
    },
    prepare({ image }) {
      return {
        title: "Reusable Block",
        media: image,
      };
    },
  },
};
