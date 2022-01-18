import React from "react";

import clsx from "clsx";

// import Photo from '@components/Photo';
import {
  imageMeta,
  ImageMetaResult,
  linkQuery,
  LinkResult,
} from "@services/pageBuilderService/queries/snippets";
import { Image } from "@components/Image";
import Typo from "@components/Typography/Typography";
import { ConditionalLink } from "@components/Link";

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

interface ImageGalleryPlugItem {
  _type: "imageGalleryItem";
  title?: string;
  size?: "m" | "l";
  image?: ImageMetaResult;
  link?: LinkResult;
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
        const { image, title, _key, link, size = "m" } = item;

        return (
          <ConditionalLink
            href={link?.href || "/"}
            external={!!link?.external}
            condition={!!link}
            key={_key}
            className={clsx(
              "w-full relative rounded-theme overflow-hidden shadow-2xl  bg-primary ",
              {
                "aspect-w-10 aspect-h-10 ": ratio === "1:1",
                "aspect-w-16 aspect-h-9": ratio === "16:9",
                "aspect-w-3 aspect-h-2": ratio === "3:2",
                "aspect-w-2 aspect-h-3": ratio === "2:3",
                "col-span-2 row-span-2  ": size === "l",
              }
            )}
          >
            {image && <Image image={image} />}

            {title && (
              <div className="absolute bottom-0 flex items-end left-4 ">
                <div className="pb-6 ">
                  {title.split("\n").map((string, index) => (
                    <div key={index}>
                      <Typo
                        space={false}
                        className="inline-block py-0.5 px-4  m-0 bg-white "
                      >
                        {string}
                      </Typo>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ConditionalLink>
        );
      })}
    </div>
  );
};

export default ImageGalleryPlug;

export {};
