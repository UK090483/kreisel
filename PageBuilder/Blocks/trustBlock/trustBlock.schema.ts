import { blockStyle } from "../../schemaHelper/blockStyle";
import { getFieldGroups } from "../../schemaHelper/getFieldGroup";
import sectionTitle from "../../schemaHelper/sectionTitle";

export const trustBlockSchema = {
  name: "trust",
  type: "object",
  title: "Trust",
  ...getFieldGroups(),
  fields: [
    sectionTitle({ group: "content" }),
    {
      title: "Header",
      name: "content",
      type: "headerRichText",
    },
    {
      title: "Items",
      name: "items",
      type: "array",
      of: [{ type: "trustItem" }],
      group: "content",
    },
    ...blockStyle(),
  ],
  preview: {
    select: {
      image: "image",
      content: "content",
      bgColor: "bgColor",
    },
    prepare({ image }: any) {
      return {
        title: "Trust",
        media: image,
      };
    },
  },
};

export const trustBlockItem = {
  name: "trustItem",
  type: "object",
  title: "Trust item",
  fields: [
    { title: "Image", name: "image", type: "defaultImage" },
    {
      title: "value",
      name: "value",
      type: "string",
    },
    {
      title: "Name",
      name: "name",
      type: "text",
    },
  ],
  preview: {
    select: {
      image: "image",
      name: "name",
      value: "value",
    },
    prepare({ image, name, value }: any) {
      return {
        title: `${name} - ${value}`,
        media: image,
      };
    },
  },
};
