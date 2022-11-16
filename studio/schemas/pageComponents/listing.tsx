import { MdViewList } from "react-icons/md";
import makeBlock from "./snippets/makeBlock";

const block = makeBlock({
  title: "Listing",
  name: "listing",
  content: [
    { name: "name", type: "string", title: "Name" },
    {
      name: "contentType",
      type: "string",
      options: {
        list: [
          { title: "Aktuelles", value: "aktuelles" },
          { title: "Blogs", value: "blog" },
          { title: "Artikel", value: "article" },
          { title: "Testimonials", value: "testimonial" },
          { title: "Therapeuten", value: "therapist" },
          { title: "People", value: "people" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
    },
    {
      name: "customItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }, { type: "page" }],
        },
        {
          type: "object",
          name: "Custom Card",
          fields: [
            { name: "title", type: "string", title: "Name" },
            { name: "link", type: "link", title: "Link" },
            { name: "description", type: "text", title: "Description" },
            { name: "image", type: "defaultImage", title: "Image" },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.contentType !== "custom",
    },
    {
      name: "peopleItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
      hidden: ({ parent }) => parent?.contentType !== "people",
    },
    {
      name: "testimonialItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
      hidden: ({ parent }) => parent?.contentType !== "testimonial",
    },
    {
      name: "content",
      type: "headerRichText",
      title: "Header",
    },
  ],
  style: [
    {
      name: "variation",
      title: "Variation",
      type: "string",

      options: {
        list: [
          { title: "Cards", value: "cards" },
          { title: "List", value: "list" },
        ],
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      contentType: "contentType",
    },
    prepare({ name, contentType }) {
      return {
        title: name,
        subtitle: `Listing: ${contentType ? " - " + contentType : ""}`,
        media: MdViewList,
      };
    },
  },
});

export default block;
// const b = {
//   title: "Listing",
//   name: "listing",
//   type: "object",
//   fieldsets: [
//     {
//       name: "space",
//       title: "Space",
//       options: { collapsible: true, collapsed: true, columns: 2 },
//     },

//     {
//       name: "transitions",
//       title: "Übergänge",
//       options: { collapsible: true, collapsed: true },
//     },
//   ],
//   fields: [
//     { name: "name", type: "string", title: "Name" },

//     {
//       name: "contentType",
//       type: "string",
//       options: {
//         list: [
//           { title: "Aktuelles", value: "aktuelles" },
//           { title: "Blogs", value: "blog" },
//           { title: "Artikel", value: "article" },
//           { title: "Testimonials", value: "testimonial" },
//           { title: "Therapeuten", value: "therapist" },
//           { title: "People", value: "people" },
//           { title: "Custom", value: "custom" },
//         ],
//         layout: "radio",
//       },
//     },
//     {
//       name: "customItems",
//       type: "array",
//       of: [
//         {
//           type: "reference",
//           to: [{ type: "article" }, { type: "page" }],
//         },
//         {
//           type: "object",
//           name: "Custom Card",
//           fields: [
//             { name: "title", type: "string", title: "Name" },
//             { name: "description", type: "text", title: "Description" },
//             { name: "image", type: "defaultImage", title: "Image" },
//           ],
//         },
//       ],
//       hidden: ({ parent }) => parent?.contentType !== "custom",
//     },
//     {
//       name: "peopleItems",
//       type: "array",
//       of: [
//         {
//           type: "reference",
//           to: [{ type: "person" }],
//         },
//       ],
//       hidden: ({ parent }) => parent?.contentType !== "people",
//     },
//     {
//       name: "content",
//       type: "headerRichText",
//       title: "Header",
//     },
//     {
//       title: "Background Color",
//       name: "bgColor",
//       type: "string",
//       options: {
//         list: [...colorList()],
//       },
//     },

//     {
//       name: "variation",
//       title: "Variation",
//       type: "string",

//       options: {
//         list: [
//           { title: "Cards", value: "cards" },
//           { title: "List", value: "list" },
//         ],
//       },
//     },

//     {
//       title: "Übergang Oben",
//       name: "transitionTop",
//       type: "string",
//       options: {
//         list: [{ title: "Abgerissen", value: "tearOff" }],
//       },
//       fieldset: "transitions",
//     },
//     {
//       title: "Übergang Unten",
//       name: "transitionBottom",
//       type: "string",
//       options: {
//         list: [{ title: "Abgerissen", value: "tearOff" }],
//       },
//       fieldset: "transitions",
//     },
//     {
//       title: "Top Space",
//       name: "topSpace",
//       type: "string",
//       fieldset: "space",
//       options: {
//         list: [...sizesList()],
//       },
//     },
//     {
//       title: "Bottom Space",
//       name: "bottomSpace",
//       type: "string",
//       fieldset: "space",
//       options: {
//         list: [...sizesList()],
//       },
//     },
//   ],
//   preview: {
//     select: {
//       name: "name",
//       contentType: "contentType",
//       type: "type",
//     },
//     prepare({ name, contentType, type }) {
//       return {
//         title: name,
//         subtitle: `Listing: ${type}${contentType ? " - " + contentType : ""}`,
//         media: MdViewList,
//       };
//     },
//   },
// };
