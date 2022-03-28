export default {
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
    prepare({ image, name, value }) {
      return {
        title: `${name} - ${value}`,
        media: image,
      };
    },
  },
};
