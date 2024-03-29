import { AppColor } from "../../../../types";
import {
  linkQuery,
  LinkResult,
  ImageResult,
  imageQuery,
} from "PageBuilder/baseQueries";

export const imageGalleryPlugQuery = `
_type == "imageGalleryPlug" => {
  ...,
  _type,
  _key,
  'items':items[]{
    ...,
    'image': select( 
      defined(image.asset) => image,
      link.internalLink->image
    ){${imageQuery}},
    'title': coalesce(title,link.internalLink->title),
    'link':link{${linkQuery}}
   },
  rows,
  rows_mobile,
  ratio,
  variant,
}
`;

interface ImageGalleryPlugItem {
  _type: "imageGalleryItem";
  title?: string;
  size?: "m" | "l";
  image?: ImageResult;
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
