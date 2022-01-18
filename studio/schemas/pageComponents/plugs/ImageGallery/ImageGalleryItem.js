export default {
  title: "Image Gallery Item",
  name: "imageGalleryItem",
  type: "object",

  fields: [
    { name: "title", title: "title", type: "text" },

    { name: "image", title: "Image", type: "defaultImage" },

    { name: "link", title: "Link", type: "link" },

    {
      name: "size",
      title: "Size",
      type: "string",
      initialValue: "m",
      options: {
        list: ["m", "l"],
      },
    },

    //   {
    //     name: "items",
    //     title: "Images",
    //     type: "array",
    //     of: [{ type: "defaultImage" }],
    //   },
    // {
    //   name: "rows",
    //   title: "Rows",
    //   type: "number",
    //   initialValue: 4,
    //   validation: (Rule) => Rule.required().integer().min(1).max(8),
    // },
    // {
    //   name: "rows_mobile",
    //   title: "Rows Mobile",
    //   type: "number",
    //   initialValue: 2,
    //   validation: (Rule) => Rule.required().integer().min(1).max(8),
    // },
    // {
    //   name: "ratio",
    //   title: "Ratio",
    //   type: "string",
    //   initialValue: "1:1",
    //   options: {
    //     list: ["1:1", "16:9", "2:3", "3:2"],
    //   },
    // },
  ],
  preview: {
    select: {
      name: "name",
      image: "image",
    },
    prepare({ name, image }) {
      return {
        title: "ImageGallery: " + name,
        media: image,
      };
    },
  },
};
