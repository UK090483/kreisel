import React from "react";

import { AiOutlineLink, AiOutlineDownload } from "react-icons/ai";

export const defaultRichTextSchema = {
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
            name: "tooltip",
            type: "tooltipPlug",
            title: "Tooltip",
          },
          {
            title: "DownLoad",
            name: "download",
            type: "file",
            blockEditor: {
              icon: AiOutlineDownload,
            },
          },
          {
            name: "handUnderline",
            type: "underline",
            title: "Hand Underline",
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
              icon: AiOutlineLink,
              render: (props: any) => {
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
    { type: "imagePlug" },
    { type: "spacer" },
    { type: "imageGalleryPlug" },
    { type: "embedHTML" },
    { type: "gSheet" },
    { type: "infoBox" },
  ],
};
