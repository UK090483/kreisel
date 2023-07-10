import { ImagePlugProps } from "./imagePlugQuery";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import clsx from "clsx";

import React, { PropsWithChildren } from "react";

const sizesMap = {
  "1/4": 25,
  "1/3": 33,
  "1/2": 50,
  "2/3": 66,
  full: 100,
};

const ImagePlug: React.FC<ImagePlugProps> = (props) => {
  const {
    image,
    customWidth = "1/4",
    ratio = "auto",
    float = false,
    position = "center",
  } = props;

  const hasRatio = ratio && ratio !== "auto";

  if (!image || !image.url) return null;

  return (
    <div
      id="image"
      className={clsx("w-full", {
        " sm:w-1/4": customWidth === "1/4",
        " sm:w-1/3": customWidth === "1/3",
        " sm:w-1/2": customWidth === "1/2",
        " sm:w-2/3": customWidth === "2/3",
        "w-full": customWidth === "full",
        "mx-auto": !float && position === "center",
        "ml-auto": !float && position === "right",
        "mb-6 md:mb-12": !float,
        "float-right ml-8 mb-2": float && position === "right",
        "float-left mr-8 mb-2": float && ["left", "center"].includes(position),
      })}
    >
      <AspectBox ratio={ratio}>
        <SanityImage
          src={image}
          fill={hasRatio}
          objectFit={hasRatio ? "cover" : undefined}
          className={clsx("w-full rounded-theme", { "object-fill": hasRatio })}
          sizes={`(max-width: 350px) 350px ,(max-width: 640px) 100vw, ${sizesMap[customWidth]}vw`}
        />
      </AspectBox>
    </div>
  );
};

export default ImagePlug;

const AspectBox: React.FC<
  PropsWithChildren<{ ratio?: ImagePlugProps["ratio"] }>
> = (props) => {
  const { children, ratio } = props;
  if (!ratio || ratio === "auto") {
    return <>{children}</>;
  }
  return (
    <div
      className={clsx("relative", {
        "aspect-w-3 aspect-h-2": ratio === "3:2",
        "aspect-w-5 aspect-h-9": ratio === "5:9",
        "aspect-w-16 aspect-h-9": ratio === "16:9",
        "aspect-w-1 aspect-h-1": ratio === "1:1",
      })}
    >
      {children}
    </div>
  );
};
