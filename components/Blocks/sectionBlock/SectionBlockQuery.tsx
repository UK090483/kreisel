import { richTextQuery } from "@components/RichText/RichText";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";

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

export interface SectionBlockResult {
  _type: "section";
  content: null | any;
  bgImage?: ImageMetaResult | null;
  image?: ImageMetaResult | null;
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
  topSpace?: "s" | "m" | "l" | "xl" | "xxl";
  bottomSpace?: "s" | "m" | "l" | "xl" | "xxl";
  title?: string;
  bgColor?: "black" | "white" | "primary" | "secondary" | "grey";
  width?: "m" | "l" | "s";
  type?: "accordion";
  _key: string;
}
