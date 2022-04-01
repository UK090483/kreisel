export default {
    name: "article",
    title: "Artikel",
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
        name: "price",
        title: "Price",
        type: "number",
      },
    ],
  };
  