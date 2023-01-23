const eventPlugSchema = {
  title: "Events",
  name: "eventPlug",
  type: "object",

  fields: [
    // {
    //   name: "filter",
    //   type: "array",
    //   of: [{ type: "string" }],
    //   options: {
    //     list: [
    //       { title: "Info Nachmittag", value: "info-nachmittag" },
    //       { title: "Master plan", value: "masterPlan" },
    //       { title: "Infrastructure", value: "infrastructure" },
    //       { title: "Private Home", value: "privateHome" },
    //     ],
    //   },
    // },

    {
      name: "filter",
      type: "text",
      label: "Filter",
      description: " filter by comma separated list",
    },
  ],
  preview: {
    select: {
      includeTags0: "includeTags.0.title",
      includeTags1: "includeTags.1.title",
      includeTags2: "includeTags.2.title",
    },
    prepare({ includeTags0, includeTags1, includeTags2 }: any) {
      const tags = [includeTags0, includeTags1, includeTags2].filter(
        (i) => !!i
      );

      return { title: "Events", subtitle: tags.join(", ") };
    },
  },
};

export default eventPlugSchema;
