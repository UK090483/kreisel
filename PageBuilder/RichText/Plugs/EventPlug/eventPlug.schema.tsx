import { defineField } from "sanity";

const eventPlugSchema = {
  title: "Events",
  name: "eventPlug",
  type: "object",

  fields: [
    defineField({
      name: "category",
      type: "string",
      description: `
      X01 à Seminare Hamburg
      X02 à Seminare Heidelberg
      X03 à Infoveranstaltungen
      X04 à Supervision
      X05 à Online-Seminare
      X06 à Lehrgänge`,
    }),

    {
      name: "filter",
      type: "text",
      label: "Filter",
      description: " filter by comma separated list",
    },

    {
      name: "pricing",
      type: "easyRichText",
      label: "Info",
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
