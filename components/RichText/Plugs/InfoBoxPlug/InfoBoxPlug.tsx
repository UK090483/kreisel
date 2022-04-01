import React from "react";

import clsx from "clsx";

import SanityImage from "@lib/SanityImage";
import Typo from "@components/Typography/Typography";
import { ConditionalLink } from "@components/Link";
import { linkQuery, LinkResult } from "@lib/Navigation/query";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import ImageGalleryPlugItem from "./InfoBoxPlugItem";
import ImageGalleryItem from "./InfoBoxPlugItem";
import { AppColor } from "types";

export const infoBoxPlugQuery = `
_type == "infoBox" => {
  'test':'tester',
  _type,
  _key,
  'items':items[]{...,'test':'test' },
}
`;

export interface ImageGalleryPlugItem {
  _type: "imageGalleryItem";
  title?: string;
  size?: "m" | "l";
  content?: string | null;
  content2?: string | null;
  image?: ImageMetaResult;
  link?: LinkResult;
  contain?: boolean;
  bgColor: AppColor;
  _key: string;
}

export interface ImageGalleryPlugResult {
  _type: "imageGalleryPlug";
  name?: string;
  items: ImageGalleryPlugItem[];
}

const InfoboxPlug: React.FC<{ node: ImageGalleryPlugResult }> = (props) => {
  const { items } = props.node;

  console.log(props.node);

  if (!items || items.length < 1) return <div>No Images</div>;
  return (
    <div
      className={clsx(
        "grid mx-auto  grid-flow-row gap-2 pb-2",
        " grid-cols-1 md:grid-cols-2 xl:grid-cols-4 "
      )}
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
          content,
          content2,
        } = item;
        return (
          <ImageGalleryItem
            bgColor={bgColor}
            content={content}
            content2={content2}
            contain={contain}
            image={image}
            title={title}
            key={_key}
            link={link}
          />
        );
      })}
    </div>
  );
};

export default InfoboxPlug;
