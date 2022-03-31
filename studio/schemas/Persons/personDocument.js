import { withLocalization } from "../Localizer";
export default withLocalization({
  name: "person",
  title: "Person",
  type: "document",

  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "position",
      title: "SubTitle",
      type: "text",
      localize: true,
    },
    {
      name: "description",
      title: "Description",

      type: "text",
      localize: true,
    },
    {
      name: "avatar",
      type: "defaultImage",
    },
    {
      name: "variant",
      title: "Variation",
      type: "string",
      options: {
        list: [
          { title: "Avatar (default)", value: "avatar" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
    },
  ],
});
