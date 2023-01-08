import { defaultBockContent } from "../snippets";
import { CgWebsite } from "react-icons/cg";

export default {
  type: "document",
  name: "page",
  title: "Page",
  groups: [
    {
      name: "base",
      title: "Base",
    },
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "seo",
      title: "Seo",
    },
  ],

  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
      group: "base",
    },

    {
      name: "description",
      type: "text",
      title: "Description",
      group: "base",
    },
    {
      name: "image",
      type: "defaultImage",
      group: "base",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      group: "base",
      options: {
        source: "title",
      },
    },
    {
      name: "pageType",
      type: "reference",
      to: [{ type: "pageType" }],
      group: "base",
      options: {
        disableNew: true,
      },
    },
    {
      name: "contacts",
      title: "Contacts",
      description: "if empty, default will be used",
      type: "reference",
      group: "base",
      to: [{ type: "contactItem" }],
    },

    {
      name: "layout",
      title: "Layout",
      description: "if empty, default will be used",
      type: "string",
      group: "base",

      options: {
        list: [{ title: "Glossary", value: "glossary" }],
      },
    },

    { ...defaultBockContent, group: "content" },

    {
      title: "SEO / Share Settings",
      name: "seo",
      type: "seo",
      group: "seo",
      options: {
        collapsible: true,
      },
    },
  ],

  preview: {
    select: {
      slug: "slug.current",
      pageType: "pageType.slug.current",
      title: "title",
    },
    prepare(selection) {
      const { slug, pageType, title } = selection;
      return {
        title: title,
        subtitle: pageType ? `/${pageType}/${slug}` : `/${slug}`,
        media: CgWebsite,
      };
    },
  },
};
