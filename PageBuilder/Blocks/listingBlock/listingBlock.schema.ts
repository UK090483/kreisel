import listingBlockItems from "./listingBlock.items";
import { buildListingFields } from "./listingBuilder/buildSchema";
import { blockStyle } from "PageBuilder/schemaHelper/blockStyle";
import { getFieldGroups } from "PageBuilder/schemaHelper/getFieldGroup";
import sectionTitle from "PageBuilder/schemaHelper/sectionTitle";
import { MdViewList } from "react-icons/md";

const listingSchema = {
  title: "Listing",
  name: "listing",
  type: "object",
  ...getFieldGroups(),
  fields: [
    sectionTitle({ group: "content" }),

    ...buildListingFields(listingBlockItems),

    {
      name: "content",
      type: "headerRichText",
      title: "Header",
    },

    ...blockStyle(),
  ],

  preview: {
    select: {
      title: "title",
      contentType: "contentType",
    },
    prepare({ title, contentType }: any) {
      return {
        title: title,
        subtitle: `Listing: ${contentType ? " - " + contentType : ""}`,
        media: MdViewList,
      };
    },
  },
};

export default listingSchema;
