export default {
  title: "Image Gallery",
  name: "imageGalleryPlug",
  type: "object",

  fields: [
    { name: "name", title: "title", type: "string" },
    {
      name: "items",
      title: "Images",
      type: "array",
      of: [{ type: "imageGalleryItem" }],
    },
    {
      name: "rows",
      title: "Rows",
      type: "number",
      initialValue: 4,
      validation: (Rule) => Rule.required().integer().min(1).max(8),
      hidden: ({ parent }) => parent?.variant === "carousel",
    },
    {
      name: "rows_mobile",
      title: "Rows Mobile",
      type: "number",
      initialValue: 2,
      validation: (Rule) => Rule.required().integer().min(1).max(8),
      hidden: ({ parent }) => parent?.variant === "carousel",
    },
    {
      name: "ratio",
      title: "Ratio",
      type: "string",
      initialValue: "1:1",
      options: {
        list: ["1:1", "16:9", "2:3", "3:2"],
      },
      hidden: ({ parent }) => parent?.variant === "carousel",
    },
    {
      name: "variant",
      title: "Variation",
      type: "string",

      options: {
        list: [
          { title: "Grid (default)", value: "grid" },
          { title: "Carousel", value: "carousel" },
        ],
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      items: "items",
    },

    prepare({ name }) {
      return {
        title: "ImageGallery: " + name,
      };
    },
  },
};
