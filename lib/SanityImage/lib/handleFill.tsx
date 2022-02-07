import { ImageProps } from "next/image";
import { ImageMetaResult } from "../query";
import { UseSanityImageOptions } from "../types";
import getDefaultResult from "./getDefaultResult";
import handleCrop from "./handleCrop";

const handleFill = (
  image: ImageMetaResult,
  options: UseSanityImageOptions
): ImageProps => {
  const imageProps = {
    ...getDefaultResult(image),
    objectFit: "contain",
    layout: "fill",
    ...options,
  };

  const crop = handleCrop(image);

  if (crop) {
    imageProps.src = `${imageProps.src}${crop.query}`;
  }

  if (imageProps.objectFit === "cover") {
    const hotSpot = handleHotspot(image);
    if (hotSpot) {
      imageProps.objectPosition = hotSpot.objectPosition;
    }
  }
  //@ts-ignore
  return imageProps;
};

export default handleFill;

const handleHotspot = (image: ImageMetaResult) => {
  if (!image.hotspot) return null;

  let x = image.hotspot.x * 100;
  let y = image.hotspot.y * 100;

  if (image.crop) {
    x = (image.hotspot.x + image.crop.left - image.crop.right) * 100;
    y = (image.hotspot.y - image.crop.top + image.crop.bottom) * 100;
  }
  // console.log({
  //   y: {
  //     hotspotY: image.hotspot.y,
  //     cropBottom: image.crop?.bottom,
  //     cropTop: image.crop?.top,
  //     //@ts-ignore
  //     res: image.hotspot.y - image.crop.top + image.crop.bottom,
  //   },
  // });

  return {
    objectPosition: `${x}% ${y}%`,
  };
};
