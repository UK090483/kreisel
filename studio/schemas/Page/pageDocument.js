import { defaultBockContent } from "../snippets";
import { CgWebsite } from "react-icons/cg";
import { VscFileSubmodule } from "react-icons/vsc";
import sanityClient from "part:@sanity/base/client";

import React from "react";
import Twitter from "../../components/Twitter";
import CustomArray from "../../components/CustomArray";
const SubPageIcon = () => {
  return <VscFileSubmodule />;
};

const slugify = (input) => {
  return input.toLowerCase().replace(/\s+/g, "-").slice(0, 200);
};

async function myAsyncSlugifier(params) {
  const [id, type] = params;

  console.log(params);
  const slug = slugify(input);
  const identicalDocs = await getDocsWithIdenticalSlug(slug);

  console.log(identicalDocs);

  const count = Array.isArray(identicalDocs) ? identicalDocs.length : null;
  return count ? `${slug}-${count + 1}` : slug;
}
const getDocsWithIdenticalSlug = async (slug, type = "page") => {
  const query = "*[_type==$type && slug.current == $slug]{_id}";
  const params = { slug, type };
  return sanityClient.fetch(query, params);
};

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
