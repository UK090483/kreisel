import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";

export const personItemQuery = (locale: string) => `
...,
_id,
'avatar':avatar{${imageMeta}},
'description':coalesce(description_${locale},description),
 name,
'position':coalesce(position_${locale},position),
`;
export interface PersonItemResult {
  name?: null | string;
  position?: null | string;
  description?: null | string;
  avatar?: null | ImageMetaResult;
  _id: string;
}
