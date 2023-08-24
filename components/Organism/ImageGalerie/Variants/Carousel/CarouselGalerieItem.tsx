/* eslint-disable jsx-a11y/alt-text */
import { ImageGalleryItemProps } from "../../ImageGalerie";
import Typo from "components/Atoms/Typography/Typography";

import Image from "components/Atoms/Image";
import { ConditionalLink } from "components/Atoms/Link";

import * as React from "react";
import clsx from "clsx";

const CarouselGalerieItem: React.FunctionComponent<
  ImageGalleryItemProps & { className?: string }
> = (props) => {
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
            <Image
              alt={`${title}`}
              src={image}
              fill
              className={clsx({
                "object-contain": contain,
                "object-cover": !contain,
              })}
            />
          </div>
        </div>
      </ConditionalLink>
    </>
  );
};

export default CarouselGalerieItem;
