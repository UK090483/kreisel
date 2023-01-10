import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import {
  BlockStyle,
  blockStyleProjection,
} from "PageBuilder/schemaHelper/blockStyle";

const trustBlockItemQuery = `
    ...,
   'image': image{${imageMeta}},
`;

export interface ITrustBlockItem {
  image?: ImageMetaResult | null;
  name: string;
  value: string;
  _key: string;
}

export const trustBlockQuery = `
_type == "trust" => {
  ...,
  'items':items[]{
   ${trustBlockItemQuery}
  },
${blockStyleProjection()}
}
`;

export interface trustQueryResult extends BlockStyle {
  content?: null | any;
  items?: ITrustBlockItem[] | null;
}
