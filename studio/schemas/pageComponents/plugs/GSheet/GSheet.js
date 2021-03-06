export default {
  title: "Google sheet",
  name: "gSheet",
  type: "object",
  fields: [
    { name: "url", type: "url", title: "Url" },
    {
      name: "columns",
      type: "array",
      of: [{ type: "gSheetItem" }],
    },
  ],
};
