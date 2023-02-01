import handUnderlineField from "../marks/HandUnderline/handUnderline.field";
import linkField from "../marks/Link/link.field";
import tagField from "../marks/Tag/tag.field";
import { defineType } from "sanity";

export default defineType({
  name: "headerRichText",
  type: "array",
  title: "Text",
  of: [
    {
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Underline",
            value: "underline",
          },
        ],
        annotations: [handUnderlineField, linkField, tagField],
      },
    },
    { type: "imagePlug" },
  ],
});
