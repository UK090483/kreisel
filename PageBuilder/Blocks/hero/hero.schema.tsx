import {
  blockBgColor,
  blockSpace,
  blockTransitions,
} from "PageBuilder/schemaHelper/blockStyle";
import { getFieldGroups } from "PageBuilder/schemaHelper/getFieldGroup";
import sectionTitle from "PageBuilder/schemaHelper/sectionTitle";

const heroSchema = {
  name: "hero",
  title: "Hero",
  type: "object",
  ...getFieldGroups(),
  fields: [
    sectionTitle({ group: "content" }),
    {
      title: "Text",
      name: "content",
      type: "headerRichText",
      group: "content",
    },

    {
      title: "Image",
      name: "image",
      type: "defaultImage",
      group: "content",
    },
    {
      title: "Variant",
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Full HeroImage", value: "full" },
          { title: "Half HeroImage", value: "half" },
        ],
      },
      initialValue: "1/3",
    },
    {
      title: "Height",
      name: "size",
      type: "string",
      options: {
        list: [
          { title: "full", value: "full" },
          { title: "1/2", value: "1/2" },
          { title: "1/3", value: "1/3" },
          { title: "2/3", value: "2/3" },
        ],
      },
      initialValue: "1/3",
      group: "content",
    },
    {
      title: "Filter intensity",
      name: "filterIntensity",
      type: "string",
      options: {
        list: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90"],
      },
      group: "content",
    },
    {
      title: "Filter Color",
      name: "filterColor",
      type: "string",
      options: {
        list: ["white", "primary-light"],
      },
      group: "content",
    },
    ...blockSpace(),
    ...blockBgColor(),
    ...blockTransitions(),
  ],

  preview: {
    select: {
      image: "image",
      content: "content",
      bgColor: "bgColor",
      title: "title",
    },
    prepare({ image, title }: any) {
      return {
        title: title || "hero",
        media: image,
      };
    },
  },
};
export default heroSchema;
