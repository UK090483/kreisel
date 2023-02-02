import { colorList } from "PageBuilder/schemaHelper/snippets";
import { defineType } from "sanity";

export default defineType({
  title: "Link",
  name: "underline",
  type: "object",

  fields: [
    {
      title: "Color",
      name: "color",
      type: "string",
      options: {
        list: [...colorList()],
      },
    },
    {
      title: "Variant",
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Auto", value: "auto" },
          { title: "Line 1", value: "line1" },
          { title: "Line 2", value: "line2" },
          { title: "Line 3", value: "line3" },
          { title: "Circle 1", value: "circle1" },
          { title: "Circle 2", value: "circle2" },
        ],
      },
    },
    {
      title: "Show on",
      name: "on",
      type: "string",
      options: {
        list: [{ title: "Scroll", value: "scroll" }],
      },
    },
  ],

  preview: {
    select: {
      label: "label",
    },
    prepare(value) {
      return { title: value.label || "Label" };
    },
  },
});
