import { sizesList } from "PageBuilder/schemaHelper/snippets";
import { defineType } from "sanity";

const spacerSchema = defineType({
  title: "Space",
  name: "spacer",
  type: "object",
  fields: [
    {
      title: "Space",
      name: "space",
      type: "string",

      options: {
        list: [...sizesList()],
      },
    },
  ],
  preview: {
    select: {
      space: "space",
    },
    prepare({ space }) {
      return { title: `Space ${space}` };
    },
  },
});

export default spacerSchema;
