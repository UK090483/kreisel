import { defaultBockContent } from "../snippets";
import { CgWebsite } from "react-icons/cg";
import {VscFileSubmodule} from 'react-icons/vsc'
import React from 'react'
const SubPageIcon=()=>{
  return <VscFileSubmodule color="red"/>
}

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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pageType",
      type: "reference",
      to: [{ type: "pageType" }],
      options:{
        disableNew:true
      }
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
  orderings:[{
    title: 'by PageType',
    name: 'pageType',
    by: [
      {field: 'pageType.slug.current', direction: 'desc'}
    ]
  },],

  preview: {
    select: {
      slug: "slug.current",
      pageType: "pageType.slug.current",
      title:'title'
    },
    prepare(selection) {
      const {slug, pageType,title} = selection
      return {
        title: title,
        subtitle: pageType? `${pageType}/${slug}`: slug,
        media: pageType? SubPageIcon: CgWebsite
      }
    }
  },
};
