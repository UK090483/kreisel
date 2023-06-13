import { blockStyle } from "../../schemaHelper/blockStyle";
import { getFieldGroups } from "../../schemaHelper/getFieldGroup";

export const reusableBlock = {
  name: "reusable",
  type: "object",
  title: "Reusable Block",

  fields: [
    {
      title: "Block",
      name: "item",
      type: "reference",
      to: [{ type: "reuseAble" }],
    },
  ],
  preview: {
    select: {
      image: "image",
      content: "content",
      bgColor: "bgColor",
    },
    prepare({ image }: any) {
      return {
        title: "Reusable Block",
        media: image,
      };
    },
  },
};

export const reusableDocument = {
  name: "reuseAble",
  title: "Reuseable",
  type: "document",
  ...getFieldGroups(),
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
    },
    {
      name: "content",
      type: "headerRichText",
      title: "Content",
      group: "content",
    },
    {
      title: "Image",
      name: "image",
      type: "defaultImage",
      group: "content",
    },
    ...blockStyle(),
  ],
};
