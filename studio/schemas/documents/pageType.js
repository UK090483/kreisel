import React from "react";
import { VscMultipleWindows } from "react-icons/vsc";
export default {
  name: "pageType",
  title: "Page type",
  type: "document",
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
    },
  ],

  preview: {
    select: {
      name: "name",
      slug: "slug",
    },
    prepare(selection) {
      const { name, slug } = selection;

      return {
        title: name,
        subtitle: `${slug.current}/...`,
        media: VscMultipleWindows,
      };
    },
  },
};
