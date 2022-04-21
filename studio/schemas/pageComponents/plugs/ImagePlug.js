import React from "react";
const Image = (props) => {
  if (!props?.value?.image) return <span>{"no Image"}</span>;
  return <img alt="" width="100%" src={`${props?.value?.image}?w=500`} />;
};

export default {
  title: "Image",
  name: "imagePlug",
  type: "object",

  fields: [
    {
      type: "defaultImage",
      name: "image",
      title: "image",
    },
    {
      title: "Width",
      name: "customWidth",
      type: "string",
      options: {
        list: [
          { title: "1/4", value: "1/4" },
          { title: "1/3", value: "1/3" },
          { title: "1/2", value: "1/2" },
          { title: "2/3", value: "2/3" },
          { title: "full", value: "full" },
        ],
      },
    },

    {
      title: "Ratio",
      name: "ratio",
      type: "string",

      options: {
        list: [
          { title: "1:1", value: "1:1" },
          { title: "3:2", value: "3:2" },
          { title: "5:9", value: "5:9" },
          { title: "16:9", value: "16:9" },
        ],
      },
    },

    {
      title: "Position",
      name: "position",
      type: "string",
      options: {
        list: [
          { title: "left", value: "left" },
          { title: "center (default)", value: "center" },
          { title: "right", value: "right" },
        ],
      },
    },

    {
      title: "Text Float",
      name: "float",
      type: "boolean",
    },
  ],

  preview: {
    select: {
      image: "image.asset.url",
    },
    component: Image,
  },
};
