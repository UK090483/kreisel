import Typo from "components/Atoms/Typography/Typography";
import { ConditionalLink, LinkProps } from "components/Atoms/Link";
import Image, { ImageSrc } from "components/Atoms/Image";

import * as React from "react";
import clsx from "clsx";
import { ImageGalleryItemProps } from "../../ImageGalerie";

const GridGalleryItem: React.FunctionComponent<
  ImageGalleryItemProps & { className?: string }
> = (props) => {
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
            <Image
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

export default GridGalleryItem;
