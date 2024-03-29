import downloadField from "../marks/Download/download.field";
import tooltipField from "../marks/Tooltip/tooltip.field";
import handUnderlineField from "../marks/HandUnderline/handUnderline.field";

import linkField from "../marks/Link/link.field";
import styleField from "../marks/Style/style.field";
import { defineType } from "sanity";

export const defaultRichTextSchema = defineType({
  name: "defaultRichText",
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
        annotations: [
          tooltipField,
          downloadField,
          handUnderlineField,
          linkField,
          styleField,
        ],
      },
    },
    { type: "imagePlug" },
    { type: "spacer" },
    { type: "imageGalleryPlug" },
    { type: "embedHTML" },
    { type: "gSheet" },
    { type: "infoBox" },
    { type: "eventPlug" },
  ],
});
