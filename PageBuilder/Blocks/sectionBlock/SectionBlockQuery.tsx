import { richTextQuery } from "PageBuilder/RichText/defaultRichtext/defaultRichText.query";
import { imageQuery, ImageResult } from "PageBuilder/Image/sanityImage.query";
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
  bgImage{${imageQuery}},
  image{${imageQuery}},
  ${blockStyleProjection()}
}
`;

export interface SectionBlockResult extends BlockStyle {
  _type: "section";
  content: null | any;
  bgImage?: ImageResult | null;
  image?: ImageResult | null;
  title?: string;
  type?: "accordion";
  _key: string;
}
