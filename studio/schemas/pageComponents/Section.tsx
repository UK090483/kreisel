import makeBlock from "./snippets/makeBlock";

const block = makeBlock({
  name: "section",
  title: "Section",
  fieldsets: [
    {
      name: "image",
      title: "Image",
      options: { collapsible: true, collapsed: true },
    },
  ],
  content: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "content",
      type: "defaultRichText",
      title: "Content",
    },
    {
      title: "Image",
      name: "image",
      type: "defaultImage",
      fieldset: "image",
    },
  ],
  style: [
    {
      title: "Width",
      name: "width",
      type: "string",
      options: {
        list: [
          { title: "Medium", value: "m" },
          { title: "Wide", value: "l" },
          { title: "Narrow", value: "s" },
        ],
      },
      initialValue: "m",
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [{ title: "Accordion", value: "accordion" }],
      },
      initialValue: "m",
    },
  ],
  preview: {
    select: {
      title: "title",
      content: "content",
      image: "image",
    },
    prepare(selection) {
      const { title, content, image } = selection;
      const block = (content || []).find((block) => block._type === "block");

      return {
        title: `Section : ${title || "unnamed"}`,
        // subtitle: `${content ? content.length : "0"} Items`,
        subtitle: block
          ? block.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "No title",
        media: image,
      };
    },
  },
});

export default block;

// export default {
//   type: "object",
//   name: "section",
//   title: "Section",
//   fieldsets: [
//     {
//       name: "space",
//       title: "Space",
//       options: { collapsible: true, collapsed: true, columns: 2 },
//     },
//     {
//       name: "Image",
//       title: "Image",
//       options: { collapsible: true, collapsed: true },
//     },
//     {
//       name: "transitions",
//       title: "Übergänge",
//       options: { collapsible: true, collapsed: true },
//     },
//   ],
//   icon: () => <AiOutlineBorderOuter />,
//   fields: [
//     {
//       name: "title",
//       type: "string",
//       title: "Title",
//     },

//     {
//       name: "content",
//       type: "defaultRichText",
//       title: "Content",
//     },

//     {
//       title: "Width",
//       name: "width",
//       type: "string",
//       options: {
//         list: [
//           { title: "Medium", value: "m" },
//           { title: "Wide", value: "l" },
//           { title: "Narrow", value: "s" },
//         ],
//       },
//       initialValue: "m",
//     },
//     {
//       title: "Type",
//       name: "type",
//       type: "string",
//       options: {
//         list: [{ title: "Accordion", value: "accordion" }],
//       },
//       initialValue: "m",
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
//     {
//       title: "Image",
//       name: "image",
//       type: "defaultImage",
//       fieldset: "Image",
//     },
//   ],
//   preview: {
//     select: {
//       title: "title",
//       content: "content",
//       image: "image",
//     },
//     prepare(selection) {
//       const { title, content, image } = selection;
//       const block = (content || []).find((block) => block._type === "block");

//       return {
//         title: `Section : ${title || "unnamed"}`,
//         // subtitle: `${content ? content.length : "0"} Items`,
//         subtitle: block
//           ? block.children
//               .filter((child) => child._type === "span")
//               .map((span) => span.text)
//               .join("")
//           : "No title",
//         media: image,
//       };
//     },
//   },
// };
