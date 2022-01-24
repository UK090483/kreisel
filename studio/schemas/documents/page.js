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

  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "featuredImage",
      type: "defaultImage",
    },

    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "pageType",
      type: "reference",
      to: [{ type: "pageType" }],
      options: {
        disableNew: true,
      },
    },

    defaultBockContent,

    {
      title: "SEO / Share Settings",
      name: "seo",
      type: "seo",
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
