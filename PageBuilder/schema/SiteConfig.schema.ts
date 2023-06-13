import { defineField, defineType } from "@sanity/types";
import { AiFillSetting } from "react-icons/ai";

const siteConfigSchema = defineType({
  name: "siteConfig",
  title: "Site config",
  type: "document",
  icon: AiFillSetting,
  groups: [
    { name: "navigation", title: "Navigation", default: true },
    { name: "pages", title: "Pages" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "Seo" },
  ],

  fields: [
    defineField({
      name: "indexPage",
      title: "Home Page",
      type: "reference",
      to: [{ type: "page" }],
      validation: (Rule) => Rule.required(),
      group: "pages",
    }),
    defineField({
      name: "mainNav",
      type: "array",
      title: "Main Navigation",
      options: {
        modal: { type: "dialog" },
      },
      of: [{ type: "navigationItem" }, { type: "navigationMegaMenu" }],
      validation: (Rule) => Rule.required(),
      group: "navigation",
    }),
    defineField({
      name: "memberNav",
      type: "array",
      title: "Mitglieder Navigation",
      options: {
        modal: { type: "popover" },
      },
      of: [{ type: "navigationItem" }, { type: "navigationMegaMenu" }],
      validation: (Rule) => Rule.required(),
      group: "navigation",
    }),
    defineField({
      name: "redirects",
      type: "array",
      title: "Redirects",
      options: {
        modal: { type: "popover" },
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
      group: "pages",
    }),
    defineField({
      name: "contacts",
      title: "Contacts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "contactItem" }] }],
      group: "footer",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "array",
      of: [{ type: "reference", to: [{ type: "footer" }] }],
      group: "footer",
    }),
    defineField({
      title: "Default / Seo",
      name: "seo",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "Main Setting" };
    },
  },
});

export const contactItemSchema = defineType({
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
});

export default siteConfigSchema;
