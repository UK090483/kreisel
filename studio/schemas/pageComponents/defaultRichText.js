import React from "react";
import { TiPencil } from "react-icons/ti";

import { colorList } from "../snippets";
const Button = (props) => {
  return <span>{props.label}</span>;
};

export default {
  name: "defaultRichText",
  type: "array",
  title: "Text",
  of: [
    {
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Underline",
            value: "underline",
          },
        ],
        annotations: [
          {
            name: "handUnderline",
            type: "underline",
            title: "Hand Underline",
          },
          {
            name: "tag",
            type: "object",
            title: "Tag",
            fields: [
              {
                title: "Tag",
                name: "tag",
                type: "string",
                options: {
                  list: [
                    { title: "Paragraph", value: "p" },
                    { title: "H1", value: "h1" },
                    { title: "H2", value: "h2" },
                    { title: "H3", value: "h3" },
                    { title: "H4", value: "h4" },
                    { title: "H5", value: "h5" },
                  ],
                },
                initialValue: "p",
              },
            ],
            blockEditor: {
              icon: () => "Tag",
              render: (props) => {
                return <span>{props.children}</span>;
              },
            },
          },
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { title: "Link", name: "link", type: "link" },
              {
                title: "As Button",
                name: "asButton",
                type: "boolean",
              },
            ],
            blockEditor: {
              icon: () => "Link",
              render: (props) => {
                console.log(props);

                const buttonStyles = {
                  border: "red solid 2px",
                  padding: "5px 20px",
                  borderRadius: "50px",
                  textDecoration: "none",
                };

                return (
                  <a
                    style={{
                      textDecoration: "underline",
                      color: "red",
                      ...(props.asButton ? buttonStyles : {}),
                    }}
                  >
                    {props.children}
                  </a>
                );
              },
            },
          },
        ],
      },
    },
    {
      type: "imagePlug",
    },
    // { type: "button", blockEditor: { render: Button } },
    { type: "spacer" },
    { type: "imageGalleryPlug" },
    { type: "embedHTML" },
    { type: "gSheet" },
    { type: "eventPlug" },
    // { type: 'imagePlug' },
    // { type: 'seoHeader' },

    // { type: 'innerSection' },

    // { type: 'download' }
  ],
};
