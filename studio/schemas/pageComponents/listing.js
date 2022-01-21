import { colorList } from "../snippets";
import { MdViewList } from "react-icons/md";

export default {
  title: "Listing",
  name: "listing",
  type: "object",
  fields: [
    { name: "name", type: "string", title: "Name" },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Content Type", value: "contentType" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
    },

    {
      name: "contentType",
      type: "string",
      options: {
        list: [
          { title: "Aktuelles", value: "aktuelles" },
          { title: "Blogs", value: "blog" },
          { title: "Artikel", value: "article" },
          { title: "Testimonials", value: "testimonial" },
          { title: "Therapeuten", value: "therapist" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.type !== "contentType",
    },
    {
      name: "customItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }, { type: "page" }],
        },
        {
          type: "object",
          name: "Custom Card",
          fields: [
            { name: "title", type: "string", title: "Name" },
            { name: "description", type: "text", title: "Description" },
            { name: "image", type: "defaultImage", title: "Image" },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.type !== "custom",
    },
    {
      name: "content",
      type: "headerRichText",
      title: "Header",
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
      name: "variation",
      title: "Variation",
      type: "string",

      options: {
        list: [
          { title: "Cards", value: "cards" },
          { title: "List", value: "list" },
        ],
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      contentType: "contentType",
      type: "type",
    },
    prepare({ name, contentType, type }) {
      return {
        title: name,
        subtitle: `Listing: ${type}${contentType ? " - " + contentType : ""}`,
        media: MdViewList,
      };
    },
  },
};
