import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import { IBlockStyle } from "../types";

export const heroBlockQuery = `
_type == "hero" => {
  ...,
  _type,
  _key,
 'photo':image{${imageMeta}},
}
`;

export interface HeroBlogResult extends IBlockStyle {
  _type: "hero";
  _key: string;
  content?: any;
  photo?: ImageMetaResult;
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
