import { defineField } from "sanity";

const linkField = (oveWrite?: {}) =>
  defineField({
    name: "title",
    type: "string",
    title: "Section Title",
    description: "should be descriptive / just for orientation or anchor link",
    validation: (Rule: any) => Rule.required(),
    ...oveWrite,
  });

export default linkField;
