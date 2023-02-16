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

const CarouselGalerieItem: React.FunctionComponent<ImageGalleryItemProps> = (
  props
) => {
  const { image, title, link, className, contain = true } = props;
  return (
    <>
      <ConditionalLink
        href={link?.href || "/"}
        external={!!link?.external}
        condition={!!link}
        className={`${className} w-full min-h-[200px]`}
      >
        <div className={clsx("grid items-center", { "grid-cols-2": title })}>
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

          <div className={`h-full min-h-[400px] relative`}>
            <SanityImage
              src={image}
              fill
              className={clsx({
                "object-contain ": contain,
                "object-cover ": !contain,
              })}
            />
          </div>
        </div>
      </ConditionalLink>
    </>
  );
};

export default CarouselGalerieItem;
