export default {
  title: "On Page Nav",
  name: "onPageNav",
  type: "object",
  fields: [
    { name: "name", type: "string", title: "Name" },

    {
      name: "items",
      type: "array",
      title: "Items",
      of: [{ type: "onPageNavItem" }],
    },
  ],
};
