export default {
  title: "Page Header",
  name: "pageHeader",
  type: "object",
  options: {
    collapsible: true,
  },
  fields: [
    {
      title: "Initial Page header color",
      name: "color",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Black", value: "black" },
        ],
        layout: "radio",
      },
    },
    {
      title: "PageTitle without Logo",
      name: "withOutLogo",
      type: "boolean",
    },
  ],
};
