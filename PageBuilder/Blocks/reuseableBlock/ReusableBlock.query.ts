import { headerRichTextQuery } from "PageBuilder/RichText/RichText";
import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import { BlockStyle } from "PageBuilder/schemaHelper/blockStyle";

export const reusableBlockQuery = `
_type == "reusable" => {
  _type,
  _key,
 item->{..., ${headerRichTextQuery},  image{${imageMeta}},}
}
`;

type ItemResult = BlockStyle & {
  content: null | any;
  bgImage?: ImageMetaResult | null;
  image?: ImageMetaResult | null;
  title?: string;
  type?: "accordion";
  _key: string;
};

export interface IReusableBlockResult {
  _type: "reusable";
  item: ItemResult;
}
