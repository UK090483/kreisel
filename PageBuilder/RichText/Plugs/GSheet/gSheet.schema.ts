import { defineType } from "sanity";

export default defineType({
  title: "Google sheet",
  name: "gSheet",
  type: "object",
  fields: [
    { name: "url", type: "url", title: "Url" },
    // {
    //   name: "columns",
    //   type: "array",
    //   of: [
    //     {
    //       title: "Google sheet Item",
    //       name: "gSheetItem",
    //       type: "object",
    //       fields: [{ name: "columnName", type: "string", title: "Name" }],
    //     },
    //   ],
    // },
  ],
});
