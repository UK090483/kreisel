export default {
  name: "tooltip",
  title: "Tooltip",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "text",
    },
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return { title };
    },
  },
};
