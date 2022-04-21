import React, { useEffect, useRef } from "react";

import clsx from "clsx";

import SanityImage from "@lib/SanityImage";
import Typo from "@components/Typography/Typography";
import { ConditionalLink } from "@components/Link";
import { linkQuery, LinkResult } from "@lib/Navigation/query";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import ImageGalleryPlugItem from "./InfoBoxPlugItem";
import ImageGalleryItem from "./InfoBoxPlugItem";
import { AppColor } from "types";
import RichText from "@components/RichText/RichText";

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
  rows?: [{ _key: string; content?: any[] | null }];
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
    <div className="grid  grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-4 ">
      {items.map((i, index) => {
        return (
          <div
            className={clsx("rounded-3xl", {
              "bg-secondary-light ": index === 0,
              "bg-blue-200  ": index === 1,
              "bg-primary-light  ": index === 2,
              "bg-green-200 ": index === 3,
            })}
            key={i._key}
          >
            {i.rows?.map((row, index) => {
              return (
                <div
                  key={row._key}
                  className={clsx("p-4 border-white first:border-0 border-t-4")}
                >
                  {index === 0 && <Typo bold> {i.title}</Typo>}
                  <RichText content={row.content} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default InfoboxPlug;
const columnsToRows = (items: ImageGalleryPlugItem[]) => {
  const rows = items.reduce((acc, item, index) => {
    const rows =
      item.rows?.map((i) => ({ content: i.content, itemKey: index })) || [];
    return [...acc, ...rows];
  }, [] as { content?: any; itemKey: number }[]);

  return rows;
};
