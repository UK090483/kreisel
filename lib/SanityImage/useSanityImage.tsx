import { UseSanityImage } from "./types";

import handleFixed from "./lib/handleFixed";
import handleFill from "./lib/handleFill";
import { ImageProps } from "next/legacy/image";

//@ts-ignore
const useSanityImage: UseSanityImage = (image, options) => {
  if (!image || !image.url) {
    return getFakeImage();
  }
  if (
    options?.layout === "fixed" ||
    options?.layout === "responsive" ||
    options?.layout === "intrinsic"
  ) {
    return handleFixed(image, options);
  }

  if (options?.layout === "fill" || options?.objectFit) {
    return handleFill(image, options);
  }

  return handleFixed(image, { ...options });
};

export default useSanityImage;

const ranNum = (min: number = 4, max: number = 8) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getFakeImage = () => {
  const ranImage = `${ranNum()}00/${ranNum()}00`;
  return {
    blurDataURL: `https://picsum.photos/50/50?blur=2`,
    src: `https://picsum.photos/${ranImage}`,
    alt: "bla",
    layout: "fill",
  } as ImageProps;
};
