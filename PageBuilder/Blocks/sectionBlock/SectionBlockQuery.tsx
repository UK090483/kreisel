import { richTextQuery } from "PageBuilder/RichText/defaultRichtext/defaultRichText.query";
import { imageQuery, ImageResult } from "PageBuilder/baseQueries";
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
  textDirection,
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
  textDirection?: "center" | null;
  _key: string;
}
