export default {
  title: "Tooltip",
  name: "tooltipPlug",
  type: "object",

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
    {
      name: "tooltipRef",
      title: "Global Tooltip",
      type: "reference",
      to: [{ type: "tooltip" }],
    },
  ],
  preview: {
    prepare({ includeTags0, includeTags1, includeTags2 }) {
      const tags = [includeTags0, includeTags1, includeTags2].filter(
        (i) => !!i
      );

      return { title: "Events", subtitle: tags.join(", ") };
    },
  },
};
