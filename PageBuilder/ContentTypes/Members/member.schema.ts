import fields from "../../../lib/Profile/Fields";
import { defineType } from "sanity";

export default defineType({
  name: "member",
  title: "Mitglied",
  type: "document",
  fields,

  preview: {
    select: {
      title: "name",
      subtitle: "firstName",
      media: "image",
    },
  },
});
