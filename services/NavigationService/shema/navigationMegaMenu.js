export default {
  title: "Navigation Mega Menu",
  name: "navigationMegaMenu",
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
      of: [{ type: "navigationMegaMenuItem" }, { type: "navigationItem" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};
