import makeBlock from "../pageComponents/snippets/makeBlock";

export default makeBlock({
  name: "reuseAble",
  title: "Reuseable",
  type: "document",
  content: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "content",
      type: "headerRichText",
      title: "Content",
    },
    {
      title: "Image",
      name: "image",
      type: "defaultImage",
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
  ],
});

// export default withLocalization({
//   name: "reuseAble",
//   title: "Reuseable",
//   type: "document",

//   fields: [
//     {
//       name: "title",
//       type: "string",
//       title: "Title",
//     },
//     {
//       name: "content",
//       type: "easyRichText",
//       title: "Content",
//     },
//     {
//       title: "Image",
//       name: "image",
//       type: "defaultImage",
//     },
//   ],
// });
