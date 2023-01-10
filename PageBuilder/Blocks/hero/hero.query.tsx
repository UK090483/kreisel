import { imageQuery, ImageResult } from "PageBuilder/Image/sanityImage.query";
import {
  BlockBgColor,
  blockBgColorProjection,
  BlockSpace,
  blockSpaceProjection,
  BlockTransition,
  blockTransitionProjection,
} from "PageBuilder/schemaHelper/blockStyle";

export const heroBlockQuery = `
_type == "hero" => {
  ...,
  _type,
  _key,
 'photo':image{${imageQuery}},

 ${blockBgColorProjection()}
 ${blockSpaceProjection()}
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
  photo?: ImageResult;
  title?: string;
  text?: string;
  filterIntensity?:
    | "0"
    | "10"
    | "20"
    | "30"
    | "40"
    | "50"
    | "60"
    | "70"
    | "80"
    | "90";
  filterColor?: "white" | "primary-light";
  size?: "full" | "1/2" | "2/3" | "1/3";
  variant?: "full" | "half";
}
