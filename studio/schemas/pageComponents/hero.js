export default {
  name: "hero",
  type: "object",
  title: "Hero",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Text",
      name: "content",
      type: "headerRichText",
    },
    {
      title: "Button text",
      name: "btnText",
      type: "string",
    },
    {
      title: "Button link",
      name: "btnLink",
      type: "string",
    },
    {
      title: "Image",
      name: "image",
      type: "defaultImage",
    },
    {
      title: "Size",
      name: "size",
      type: "string",
      options: {
        list: [
          { title: "full", value: "full" },
          { title: "1/2", value: "1/2" },
          { title: "1/3", value: "1/3" },
          { title: "2/3", value: "2/3" },
        ],
      },
      initialValue: "1/3",
    },
    {
      title: "Filter intensity",
      name: "filterIntensity",
      type: "string",
      options: {
        list: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90"],
      },
      initialValue: "0",
    },
    {
      title: "Filter Color",
      name: "filterColor",
      type: "string",
      options: {
        list: ["white", "black"],
      },
      initialValue: "white",
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
        title: "hero",
        media: image,
      };
    },
  },
};
