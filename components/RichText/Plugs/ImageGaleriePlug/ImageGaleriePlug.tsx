import React from "react";

import clsx from "clsx";

import SanityImage from "@lib/SanityImage";
import Typo from "@components/Typography/Typography";
import { ConditionalLink } from "@components/Link";
import { linkQuery, LinkResult } from "@lib/Navigation/query";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import ImageGalleryPlugItem from "./ImageGalerieItem";
import ImageGalleryItem from "./ImageGalerieItem";
import { AppColor } from "types";

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
}

const ImageGalleryPlug: React.FC<{ node: ImageGalleryPlugResult }> = (
  props
) => {
  const { items, rows = 4, rows_mobile = 2, ratio = "1:1" } = props.node;

  if (!items || items.length < 1) return <div>No Images</div>;
  return (
    <div
      className={clsx("grid grid-flow-row gap-2 pb-2", {
        "grid-cols-1": rows_mobile === 1,
        "grid-cols-2": rows_mobile === 2,
        "grid-cols-3": rows_mobile === 3,
        "grid-cols-4": rows_mobile === 4,
        "grid-cols-5": rows_mobile === 5,
        "grid-cols-6": rows_mobile === 6,
        "grid-cols-7": rows_mobile === 7,
        "grid-cols-8": rows_mobile === 8,
        "md:grid-cols-1": rows === 1,
        "md:grid-cols-2": rows === 2,
        "md:grid-cols-3": rows === 3,
        "md:grid-cols-4": rows === 4,
        "md:grid-cols-5": rows === 5,
        "md:grid-cols-6": rows === 6,
        "md:grid-cols-7": rows === 7,
        "md:grid-cols-8": rows === 8,
      })}
    >
      {items.map((item) => {
        const {
          image,
          title,
          _key,
          link,
          size = "m",
          contain,
          bgColor = "primary",
        } = item;
        return (
          <ImageGalleryItem
            contain={contain}
            image={image}
            title={title}
            key={_key}
            link={link}
            className={clsx({
              "aspect-w-10 aspect-h-10 ": ratio === "1:1",
              "aspect-w-16 aspect-h-9": ratio === "16:9",
              "aspect-w-3 aspect-h-2": ratio === "3:2",
              "aspect-w-2 aspect-h-3": ratio === "2:3",
              "col-span-2 row-span-2  ": size === "l",
              "bg-white": bgColor === "white",
              "bg-primary": bgColor === "primary",
              "bg-secondary": bgColor === "secondary",
              " bg-grey": bgColor === "grey",
            })}
          />
        );
      })}
    </div>
  );
};

export default ImageGalleryPlug;
