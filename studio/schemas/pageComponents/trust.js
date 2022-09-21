import { colorList, sizesList } from "../snippets";

export default {
  name: "trust",
  type: "object",
  title: "Trust",

  fieldsets: [
    {
      name: "transitions",
      title: "Übergänge",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
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
      title: "Übergang Oben",
      name: "transitionTop",
      type: "string",
      options: {
        list: [{ title: "Abgerissen", value: "tearOff" }],
      },
      fieldset: "transitions",
    },
    {
      title: "Übergang Unten",
      name: "transitionBottom",
      type: "string",
      options: {
        list: [{ title: "Abgerissen", value: "tearOff" }],
      },
      fieldset: "transitions",
    },
  ],
  preview: {
    select: {
      image: "image",
      content: "content",
      bgColor: "bgColor",
    },
    prepare({ image }) {
      return {
        title: "Trust",
        media: image,
      };
    },
  },
};
