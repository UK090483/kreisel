import { blockStyle } from "PageBuilder/schemaHelper/blockStyle";
import { getFieldGroups } from "PageBuilder/schemaHelper/getFieldGroup";
import sectionTitle from "PageBuilder/schemaHelper/sectionTitle";
import { MdViewList } from "react-icons/md";

const listingSchema = {
  title: "Listing",
  name: "listing",
  type: "object",
  ...getFieldGroups(),
  fields: [
    sectionTitle({ group: "content" }),

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
          { title: "People", value: "people" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
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
            { name: "link", type: "link", title: "Link" },
            { name: "description", type: "text", title: "Description" },
            { name: "image", type: "defaultImage", title: "Image" },
          ],
        },
      ],
      hidden: ({ parent }: any) => parent?.contentType !== "custom",
    },
    {
      name: "peopleItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
      hidden: ({ parent }: any) => parent?.contentType !== "people",
    },
    {
      name: "testimonialItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
      hidden: ({ parent }: any) => parent?.contentType !== "testimonial",
    },
    {
      name: "content",
      type: "headerRichText",
      title: "Header",
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
    ...blockStyle(),
  ],

  preview: {
    select: {
      title: "title",
      contentType: "contentType",
    },
    prepare({ title, contentType }: any) {
      return {
        title: title,
        subtitle: `Listing: ${contentType ? " - " + contentType : ""}`,
        media: MdViewList,
      };
    },
  },
};

export default listingSchema;
