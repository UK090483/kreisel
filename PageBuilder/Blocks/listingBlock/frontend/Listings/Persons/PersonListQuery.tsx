import { imageQuery, ImageResult } from "PageBuilder/Image/sanityImage.query";

export const personItemQuery = (locale: string) => `
...,
_id,
'avatar':avatar{${imageQuery}},
'description':coalesce(description_${locale},description),
 name,
'position':coalesce(position_${locale},position),
`;
export interface PersonItemResult {
  name?: null | string;
  position?: null | string;
  description?: null | string;
  avatar?: null | ImageResult;
  _id: string;
}
