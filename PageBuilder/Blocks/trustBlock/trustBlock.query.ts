import { imageQuery, ImageResult } from "PageBuilder/baseQueries";
import {
  BlockStyle,
  blockStyleProjection,
} from "PageBuilder/schemaHelper/blockStyle";

const trustBlockItemQuery = `
    ...,
   'image': image{${imageQuery}},
`;

interface ITrustBlockItem {
  image?: ImageResult;
  name: string;
  value: string;
  _key: string;
}

export const trustBlockQuery = `
_type == "trust" => {
  ...,
  _type,
  'items':items[]{
   ${trustBlockItemQuery}
  },
${blockStyleProjection()}
}
`;

export interface trustQueryResult extends BlockStyle {
  _key: string;
  _type: "trust";
  content?: null | any;
  items?: ITrustBlockItem[] | null;
}
