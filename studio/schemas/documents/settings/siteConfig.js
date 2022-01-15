import CustomObject from "../../../components/CustomObject";

export default {
  name: "siteConfig",
  title: "Site config",
  type: "document",
  fields: [
    {
      name: "indexPage",
      title: "Home Page",
      type: "reference",
      to: [{ type: "page" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainNav",
      type: "array",
      title: "Main Navigation",
      options: {
        editModal: "popover",
      },
      of: [{ type: "navigationItem" }, { type: "navigationMegaMenu" }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Default / Seo",
      name: "seo",
      type: "seo",
    },
  ],
};
