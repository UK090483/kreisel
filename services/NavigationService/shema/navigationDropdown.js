export default {
  title: "Navigation Dropdown",
  name: "navigationDropdown",
  type: "object",
  fields: [
    { name: "label", type: "string", title: "Label" },

    {
      name: "items",
      type: "array",
      title: "Main Navigation",
      of: [{ type: "navigationItem" }],
    },
  ],
};
