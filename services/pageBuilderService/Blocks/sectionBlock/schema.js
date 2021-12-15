import React from "react";
import { AiOutlineBorderOuter } from "react-icons/ai";
import { colorList, sizesList } from "../snippets";
export default {
  type: "object",
  name: "section",
  title: "Section",
  fieldsets: [
    {
      name: "space",
      title: "Space",
      options: { collapsible: true, collapsed: true, columns: 2 },
    },
    {
      name: "Image",
      title: "Image",
      options: { collapsible: true, collapsed: true },
    },
  ],
  icon: () => <AiOutlineBorderOuter />,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },

    {
      name: "content",
      type: "defaultRichText",
      title: "Content",
    },

    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Medium", value: "m" },
          { title: "Wide", value: "l" },
          { title: "Narrow", value: "s" },
        ],
      },
      initialValue: "normal",
    },
    {
      title: "Background Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [...colorList()],
      },
    },
    {
      title: "Top Space",
      name: "topSpace",
      type: "string",
      fieldset: "space",
      options: {
        list: [...sizesList()],
      },
    },
    {
      title: "Bottom Space",
      name: "bottomSpace",
      type: "string",
      fieldset: "space",
      options: {
        list: [...sizesList()],
      },
    },
    {
      title: "Image",
      name: "image",
      type: "defaultImage",
      fieldset: "Image",
    },
  ],
  preview: {
    select: {
      title: "title",
      content: "content",
      image: "image",
    },
    prepare(selection) {
      const { title, content, image } = selection;
      const block = (content || []).find((block) => block._type === "block");

      return {
        title: `Section : ${title || "unnamed"}`,
        // subtitle: `${content ? content.length : "0"} Items`,
        subtitle: block
          ? block.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "No title",
        media: image,
      };
    },
  },
};
