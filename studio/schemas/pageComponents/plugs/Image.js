import { sizesList } from "../../snippets";

export default {
  title: "Image",
  name: "imagePlug",
  type: "object",

  fields: [
    { title: "Image", name: "image", type: "defaultImage" },

    // {
    //   title: "Height",
    //   name: "customHeight",
    //   type: "string",
    //   options: {
    //     isHighlighted: true,
    //     list: [...sizesList()],
    //   },
    // },
    // {
    //   title: "Layout",
    //   name: "layout",
    //   type: "string",
    //   description: "Important if  height is set",
    //   options: {
    //     isHighlighted: true,
    //     list: [
    //       { title: "Fill", value: "fill" },
    //       { title: "Contain", value: "contain" },
    //     ],
    //   },
    //   initialValue: "contain",
    // },
    // {
    //   title: "Alternative text",
    //   name: "alt",
    //   type: "string",
    //   description: "Important for SEO and accessiblity.",
    //   options: {
    //     isHighlighted: true,
    //   },
    //   validation: (Rule) => {
    //     return Rule.custom((field, context) =>
    //       "asset" in context.parent && field === undefined
    //         ? "Required! (think about non-visual readers)"
    //         : true
    //     );
    //   },
    // },
  ],
  preview: {
    select: {
      asset: "asset",
      alt: "alt",
      // customRatio: 'customRatio'
    },
    prepare({ alt, asset }) {
      // const crop = crops.find(crop => crop.value === customRatio)

      return {
        title: alt || "(alt text missing)",
        // subtitle: crop.title,
        media: asset,
      };
    },
  },
};
