export default {
  title: "Events",
  name: "eventPlug",
  type: "object",

  fields: [
    {
      name: "includeTags",
      title: "Include Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "eventTag" } }],
    },
  ],
  preview: {
    select: {
      includeTags0: "includeTags.0.title",
      includeTags1: "includeTags.1.title",
      includeTags2: "includeTags.2.title",
    },
    prepare({ includeTags0, includeTags1, includeTags2 }) {
      const tags = [includeTags0, includeTags1, includeTags2].filter(
        (i) => !!i
      );

      return { title: "Events", subtitle: tags.join(", ") };
    },
  },
};
