import { defaultBockContent } from "../snippets";
import { CgWebsite } from "react-icons/cg";
import { VscFileSubmodule } from "react-icons/vsc";

import React from "react";
import Twitter from "../../components/Twitter";
import CustomArray from "../../components/CustomArray";
const SubPageIcon = () => {
  return <VscFileSubmodule color="red" />;
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
    // {
    //   name: "twitter",
    //   type: "string",
    //   title: "Twitter",
    //   inputComponent: Twitter,
    // },
    // {
    //   name: "customArray",
    //   type: "array",
    //   title: "CustomArray",
    //   of: [{ type: "navigationItem" }],
    //   inputComponent: CustomArray,
    // },
    // {
    //   name: "defaultArray",
    //   type: "array",
    //   title: "defaultArray",
    //   of: [{ type: "navigationItem" }],
    // },
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
      validation: (Rule) => Rule.required(),
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
  orderings: [
    {
      title: "by PageType",
      name: "pageType",
      by: [{ field: "pageType.slug.current", direction: "desc" }],
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
        subtitle: pageType ? `${pageType}/${slug}` : slug,
        media: pageType ? SubPageIcon : CgWebsite,
      };
    },
  },
};
