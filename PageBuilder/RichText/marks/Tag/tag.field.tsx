import { defineField } from "sanity";

export default defineField({
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
  // blockEditor: {
  //   icon: () => "Tag",
  //   // render: (props) => {
  //   //   return <span>{props.children}</span>;
  //   // },
  // },
});
