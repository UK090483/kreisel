import { AiOutlineFormatPainter } from "react-icons/ai";
import { defineField } from "sanity";

export default defineField({
  name: "style",
  type: "object",
  title: "Style",
  fields: [
    {
      title: "Tag",
      name: "tag",
      type: "string",
      options: {
        list: [
          { title: "Paragraph", value: "p" },
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
        ],
      },
    },
  ],
  icon: AiOutlineFormatPainter,
});
