// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Mega Menu Item",
  name: "navigationMegaMenuItem",
  type: "object",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      type: "array",
      title: "Main Navigation",
      of: [{ type: "navigationItem" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};
