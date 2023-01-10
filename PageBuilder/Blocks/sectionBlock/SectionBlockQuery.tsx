import { richTextQuery } from "PageBuilder/RichText/RichText";
import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import { BlockStyle } from "PageBuilder/schemaHelper/blockStyle";

export const sectionBlockQuery = `
_type == "section" => {
  _key,
  _type,
  title,
  width,
  bgColor,
  type,
  topSpace,
  bottomSpace,
  ${richTextQuery},
  bgImage{${imageMeta}},
  image{${imageMeta}},
  transitionTop,
  transitionBottom,
}
`;

export interface SectionBlockResult extends BlockStyle {
  _type: "section";
  content: null | any;
  bgImage?: ImageMetaResult | null;
  image?: ImageMetaResult | null;
  title?: string;
  type?: "accordion";
  _key: string;
}
