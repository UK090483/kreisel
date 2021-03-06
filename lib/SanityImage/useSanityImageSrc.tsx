import { ImageLoader, ImageProps } from "next/image";
import { UseSanityImage, UseSanityImageOptions } from "./types";
import handleCrop from "./lib/handleCrop";
import getDefaultResult from "./lib/getDefaultResult";
import handleFixed from "./lib/handleFixed";
import handleFill from "./lib/handleFill";
import { ImageMetaResult } from "./query";

export type UseSanityImageSrc = (
  image?: ImageMetaResult | null,
  options?: UseSanityImageOptions
) => string | null;

const useSanityImageSrc: UseSanityImageSrc = (image, options) => {
  if (!image || !image.url) {
    return getFakeImage();
  }

  return "";
};

export default useSanityImageSrc;

const ranNum = (min: number = 4, max: number = 8) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getFakeImage = () => {
  const ranImage = `${ranNum()}00/${ranNum()}00`;
  return `https://picsum.photos/${ranImage}`;
};
