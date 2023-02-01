import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import { richTextQuery } from "PageBuilder/RichText/defaultRichtext/defaultRichText.query";
import {
  BlockStyle,
  blockStyleProjection,
} from "PageBuilder/schemaHelper/blockStyle";

export const sectionBlockQuery = `
_type == "section" => {
  _key,
  _type,
  title,
  type,
  ${richTextQuery},
  bgImage{${imageMeta}},
  image{${imageMeta}},
  ${blockStyleProjection()}
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
