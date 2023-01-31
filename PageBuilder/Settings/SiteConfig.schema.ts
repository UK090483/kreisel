import { defineType } from "sanity";

const siteConfigSchema = defineType({
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
      name: "redirects",
      type: "array",
      title: "Redirects",
      options: {
        editModal: "popover",
      },
      of: [
        {
          type: "object",
          name: "redirect",
          fields: [
            { name: "from", type: "string", title: "From" },
            { name: "to", type: "string", title: "To" },
            { name: "permanent", type: "boolean", title: "Permanent" },
          ],
        },
      ],
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
});

export const contactItemSchema = {
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

export default siteConfigSchema;
