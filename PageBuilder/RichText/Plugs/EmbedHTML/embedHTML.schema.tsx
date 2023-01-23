import React from "react";

const HTMLpreview = ({ value }: any) => (
  // eslint-disable-next-line
  <div dangerouslySetInnerHTML={{ __html: value.html }} />
);

const embedHTMLSchema = {
  name: "embedHTML",
  title: "Embed HTML",
  type: "object",
  fields: [
    {
      name: "html",
      title: "HTML",
      type: "text",
      description:
        "You usually want to avoid storing freeform HTML, but for embed codes it can be useful.",
      options: {
        language: "html",
      },
    },
  ],
  preview: {
    select: {
      html: "html",
    },
    component: HTMLpreview,
  },
};

export default embedHTMLSchema;
