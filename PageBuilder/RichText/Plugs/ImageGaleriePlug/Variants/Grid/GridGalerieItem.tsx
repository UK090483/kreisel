import Typo from "components/Typography/Typography";

import { ImageResult } from "PageBuilder/Image/sanityImage.query";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import { ConditionalLink } from "components/Link";

import { LinkResult } from "PageBuilder/Navigation/navigation.query";
import * as React from "react";
import clsx from "clsx";
type ImageGalleryItemProps = {
  image?: ImageResult;
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
        className={`${className} shadow-2x w-full overflow-hidden rounded-theme `}
      >
        <div className="flex flex-col pt-4">
          <div className={`h-full  ${contain ? "relative" : ""}`}>
            <SanityImage
              src={image}
              fill
              className={clsx({
                "object-contain ": contain,
                "object-cover ": !contain,
              })}
            />
          </div>
          {title && (
            <div className=" relative mx-4 mb-4 h-fit ">
              <Typo
                space={false}
                className="  inline-block w-full whitespace-pre-line break-words rounded-[16px] bg-white py-4 px-6 font-bold"
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
