import { ImageLoader, ImageProps } from "next/image";
import { UseSanityImage } from "./types";
import handleCrop from "./lib/handleCrop";
import getDefaultResult from "./lib/getDefaultResult";
import handleFixed from "./lib/handleFixed";
import handleFill from "./lib/handleFill";

const useSanityImage: UseSanityImage = (image, options) => {
  if (!image || !image.url) {
    return getFakeImage();
  }

  const imageProps: ImageProps = {
    ...getDefaultResult(image),
    ...options,
  };

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
