import { headerRichTextQuery } from "@components/RichText/RichText";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import { IBlockStyle } from "../types";

export const reusableBlockQuery = `
_type == "reusable" => {
  _type,
  _key,
 item->{..., ${headerRichTextQuery},  image{${imageMeta}},}
}
`;

type ItemResult = IBlockStyle & {
  content: null | any;
  bgImage?: ImageMetaResult | null;
  image?: ImageMetaResult | null;
  title?: string;
  type?: "accordion";
  _key: string;
};

export interface IReusableBlockResult extends IBlockStyle {
  _type: "reusable";
  item: ItemResult;
}
