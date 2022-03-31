export default {
  title: "Persons",
  name: "personPlug",
  type: "object",

  fields: [
    { name: "name", title: "title", type: "string" },
    {
      name: "items",
      title: "Images",
      type: "array",
      of: [{ type: "person" }],
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare({ name }) {
      return {
        title: "ImageGallery: " + name,
      };
    },
  },
};
