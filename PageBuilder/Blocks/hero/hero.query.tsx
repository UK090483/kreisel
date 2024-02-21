import { headerRichTextQuery } from "PageBuilder/RichText/headerRichText/defaultRichText.query";
import { imageQuery, ImageResult } from "PageBuilder/baseQueries";

import {
  BlockBgColor,
  blockBgColorProjection,
  BlockSpace,
  BlockTransition,
  blockTransitionProjection,
} from "PageBuilder/schemaHelper/blockStyle";

export const heroBlockQuery = `
_type == "hero" => {
  ...,
  _type,
  _key,
 'image':image{${imageQuery}},
 ${headerRichTextQuery},
 ${blockBgColorProjection()}
 ${blockTransitionProjection()}
}
`;

export interface HeroBlogResult
  extends BlockSpace,
    BlockBgColor,
    BlockTransition {
  _type: "hero";
  _key: string;
  content?: any;
  image?: ImageResult;
  title?: string;
  size?: "full" | "1/2" | "2/3" | "1/3";
  variant?: "full" | "half";
}
