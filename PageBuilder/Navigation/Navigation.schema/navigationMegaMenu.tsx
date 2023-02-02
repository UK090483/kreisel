import { RiFileListFill } from "react-icons/ri";
import { GrMultiple } from "react-icons/gr";
import { defineType } from "sanity";
export default defineType({
  title: "Dropdown",
  name: "navigationMegaMenu",
  type: "object",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      type: "array",
      title: "Main Navigation",
      of: [{ type: "navigationMegaMenuItem" }, { type: "navigationItem" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      label: "label",
      items: "items",
    },
    prepare(selection) {
      const { label, items } = selection as {
        label?: string;
        items?: { label: string; _type: string }[];
      };
      const hasLists =
        items && items.find((i) => i._type === "navigationMegaMenuItem");

      const itemLabels =
        items &&
        items.reduce((acc, i) => {
          return `${acc} / ${i.label}`;
        }, "");
      return {
        title: label,
        subtitle: itemLabels,
        media: hasLists ? GrMultiple : RiFileListFill,
      };
    },
  },
});
