import { defineType, defineField } from "@sanity/types";

export const footerSchema = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      of: [{ type: "footerItem" }],
    }),
  ],
});

export const footerItemSchema = defineType({
  name: "footerItem",
  title: "FooterItem",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "content", type: "headerRichText", title: "Content" }),
    {
      name: "width",
      type: "string",
      title: "Width",
      options: {
        list: [
          { title: "1/4 (default)", value: "1/4" },
          { title: "1/2 ", value: "1/2" },
          { title: "1/3 ", value: "1/3" },
          { title: "2/3 ", value: "2/3" },
          { title: "Full ", value: "full" },
        ],
      },
    },
  ],
});
