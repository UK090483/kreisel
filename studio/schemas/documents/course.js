export default {
  name: "course",
  title: "Kurs",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "defaultImage",
    },
    {
      name: "items",
      title: "Events",
      type: "array",
      of: [{ type: "event" }],
    },
  ],
};
