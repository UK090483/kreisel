import { linkQuery, LinkResult } from "PageBuilder/Navigation/query";
import { imageMeta, ImageMetaResult } from "lib/SanityImage/query";
import { AppColor } from "../../../../types";

export const imageGalleryPlugQuery = `
_type == "imageGalleryPlug" => {
  ...,
  _type,
  _key,
  'items':items[]{..., 'image': image{${imageMeta}} ,'link':link{
    ${linkQuery}
  }  },
  rows,
  rows_mobile,
  ratio,
  variant
}
`;

export interface ImageGalleryPlugItem {
  _type: "imageGalleryItem";
  title?: string;
  size?: "m" | "l";
  image?: ImageMetaResult;
  link?: LinkResult;
  contain?: boolean;
  bgColor: AppColor;
  _key: string;
}

export interface ImageGalleryPlugResult {
  _type: "imageGalleryPlug";
  name?: string;
  rows?: number;
  rows_mobile?: number;
  ratio?: "1:1" | "16:9" | "2:3" | "3:2";
  items: ImageGalleryPlugItem[];
  variant?: string;
}
