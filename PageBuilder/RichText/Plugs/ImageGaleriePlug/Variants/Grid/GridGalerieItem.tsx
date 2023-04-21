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
        className={clsx(
          className,
          "w-full overflow-hidden rounded-theme shadow-theme transition-shadow ",
          { "hover:shadow-xl": !!link }
        )}
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
            <div className="relative h-fit">
              <Typo
                space={false}
                className="inline-block w-full whitespace-pre-line break-words bg-white py-2 px-6 text-center font-bold"
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
