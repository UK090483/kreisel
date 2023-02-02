import { defineType } from "sanity";

export default defineType({
  name: "easyRichText",
  type: "array",
  title: "Text",
  of: [
    {
      type: "block",
      title: "Block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],

      marks: {
        decorators: [
          { title: "Strong", value: "strong" },

          {
            title: "Underline",
            value: "underline",
          },
        ],

        annotations: [],
      },
    },
  ],
});
