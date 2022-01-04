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
          { title: "Post", value: "post" },
          { title: "Article", value: "article" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.type !== "contentType",
    },
    {
      name: "customItems",
      type: "array",
      of: [{ type: "reference", to: [{ type: "page" },{ type: "article" }] }],
      hidden: ({ parent }) => parent?.type !== "custom",
    },
  ],
};
