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
      name: "memberNav",
      type: "array",
      title: "Mitglieder Navigation",
      options: {
        editModal: "popover",
      },
      of: [{ type: "navigationItem" }, { type: "navigationMegaMenu" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "footerImage",
      type: "defaultImage",
    },
    {
      name: "contacts",
      title: "Contacts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "contactItem" }] }],
    },
    {
      title: "Default / Seo",
      name: "seo",
      type: "seo",
    },
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "mainSetting" };
    },
  },
};
