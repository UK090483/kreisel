export default {
  title: "Link",
  name: "link",
  type: "object",

  fields: [
    {
      title: "Internal link",
      description: "Use this to link between pages on the website bli",
      name: "internalLink",
      type: "reference",
      to: [{ type: "page" }],
      options: {
        disableNew: true,
      },
    },
    {
      title: "On Page Position",
      name: "onPage",
      type: "string",
      hidden: ({ parent }) => {
        return !parent?.internalLink;
      },
    },
    {
      title: "External link",
      name: "externalLink",
      type: "url",
      hidden: ({ parent }) => {
        return !!parent?.internalLink;
      },
    },
  ],
  preview: {
    select: {
      label: "label",
    },
    prepare(value) {
      return { title: value.label || "Label" };
    },
  },
};
