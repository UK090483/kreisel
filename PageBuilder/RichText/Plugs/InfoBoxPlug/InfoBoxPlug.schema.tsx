import { defineType } from "sanity";

import { BsCircleFill } from "react-icons/bs";
import { toPlainText } from "@portabletext/react";

export const infoblockPlug = defineType({
  title: "Info Box",
  name: "infoBox",
  type: "object",

  fields: [
    { name: "name", title: "title", type: "string" },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "infoBoxItem" }],
    },
    {
      name: "rows",
      title: "Rows",
      type: "number",
      initialValue: 4,
      validation: (Rule) => Rule.required().integer().min(1).max(4),
    },
  ],
  preview: {
    select: {
      name: "name",
      items: "items",
    },

    prepare({ name }) {
      return {
        title: "InfoBox: " + name,
      };
    },
  },
});

export const infoblockPlugItem = defineType({
  title: "InfoBox Item",
  name: "infoBoxItem",
  type: "object",

  fields: [
    { name: "title", title: "title", type: "text" },

    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [{ name: "content", title: "Content", type: "easyRichText" }],

          preview: {
            select: {
              content: "content",
            },

            prepare({ content }) {
              return {
                title: toPlainText(content),
              };
            },
          },
        },
      ],
    },

    {
      title: "Background Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [
          { title: "Rot", value: "red" },
          { title: "Blau", value: "blue" },
          { title: "Gelb", value: "yellow" },
          { title: "Grün", value: "green" },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
      bgColor: "bgColor",
    },
    prepare({ title, image, bgColor }) {
      const colors: { [K: string]: string } = {
        red: "#ec4e51",
        blue: "#bfdbfe",
        yellow: "#f9de83",
        green: "#bbf7d0",
      };
      const color = typeof bgColor === "string" ? colors[bgColor] : colors.blue;
      return {
        title: title,
        media: () => <BsCircleFill color={color} />,
      };
    },
  },
});
