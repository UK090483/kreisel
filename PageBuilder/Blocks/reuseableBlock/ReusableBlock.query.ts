import { imageQuery, ImageResult } from "PageBuilder/baseQueries";
import { headerRichTextQuery } from "PageBuilder/RichText/headerRichText/defaultRichText.query";
import { BlockStyle } from "PageBuilder/schemaHelper/blockStyle";

export const reusableBlockQuery = `
_type == "reusable" => {
  _type,
  _key,
 item->{..., ${headerRichTextQuery},  image{${imageQuery}},}
}
`;

type ItemResult = BlockStyle & {
  content: null | any;
  bgImage?: ImageResult | null;
  image?: ImageResult | null;
  title?: string;
  type?: "accordion";
  _key: string;
};

export interface IReusableBlockResult {
  _type: "reusable";
  item: ItemResult;
}
