export const tagSchema = {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "label",
      type: "string",
    },
    {
      name: "value",
      type: "slug",
    },
  ],
};

export const tagsSchema = {
  name: "tags",
  title: "Tags",
  type: "array",

  of: [{ type: "tag" }],
};
