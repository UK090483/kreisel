import * as React from "react";
import { ImageMetaResult } from "@lib/SanityImage/query";
import Typo from "@components/Typography/Typography";
import SanityImage from "@lib/SanityImage";
import { ConditionalLink } from "@components/Link";

import { LinkResult } from "@lib/Navigation/query";
type ImageGalleryItemProps = {
  image?: ImageMetaResult;
  title?: string;
  link?: LinkResult;
  className?: string;
  contain?: boolean;
};

const ImageGalleryItem: React.FunctionComponent<ImageGalleryItemProps> = (
  props
) => {
  const { image, title, link, className, contain = false } = props;
  return (
    <>
      <ConditionalLink
        href={link?.href || "/"}
        external={!!link?.external}
        condition={!!link}
        className={`${className}  w-full rounded-theme overflow-hidden shadow-2x `}
      >
        <div className="flex  flex-col pt-4">
          <div className={`h-full relativ  m-3 ${contain ? "relative" : ""}`}>
            <SanityImage
              image={image}
              objectFit={contain ? "contain" : "cover"}
            />
          </div>
          {title && (
            <div className=" relative h-fit mx-4 mb-4 ">
              <Typo
                space={false}
                className="inline-block py-4 px-6 w-full bg-white rounded-[16px] whitespace-pre-line"
              >
                {title}
              </Typo>
            </div>
          )}
        </div>
      </ConditionalLink>
    </>
  );
};

export default ImageGalleryItem;
