export default {
  name: "contactItem",
  title: "Contact Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "persons",
      title: "Persons",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
    },
    {
      name: "content",
      type: "headerRichText",
      title: "Content",
    },
  ],
};
