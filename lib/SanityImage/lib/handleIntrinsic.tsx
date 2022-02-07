import { ImageProps } from "next/image";
import { ImageMetaResult } from "../query";
import { UseSanityImageOptions } from "../types";
import getDefaultResult from "./getDefaultResult";
import handleCrop from "./handleCrop";
import { checkDimensionOptions } from "./helper";

const handleIntrinsic = (
  image: ImageMetaResult,
  options: UseSanityImageOptions
): ImageProps => {
  const imageProps = {
    ...getDefaultResult(image),
    width: image.width,
    height: image.height,
  };

  const {
    justWidth,
    justHeight,
    widthAndHeight,
    noDimensions,
    width,
    height,
    aspectRatio,
    crop,
  } = getDimensions(image, options);

  if (justWidth) {
    imageProps.width = width;
    imageProps.height = width / aspectRatio;
  }
  if (justHeight) {
    imageProps.width = height * aspectRatio;
    imageProps.height = height;
  }
  if (widthAndHeight) {
    imageProps.width = width;
    imageProps.height = height;
  }
  if (noDimensions) {
    imageProps.width = image.width;
    imageProps.height = image.width / aspectRatio;
  }

  if (crop) {
    imageProps.src = `${imageProps.src}${crop.query}`;
  }

  return imageProps;
};

const getDimensions = (
  image: ImageMetaResult,
  options: UseSanityImageOptions
) => {
  console.log(options);

  const crop = handleCrop(image);
  const { width, height } = checkDimensionOptions(options);

  const res = {
    crop: crop,
    justWidth: width && !height,
    justHeight: !width && height,
    widthAndHeight: !!width && !!height,
    noDimensions: !width && !height,
    width: width || image.width,
    height: height || image.height,
    aspectRatio: crop ? crop.dimensions.aspectRatio : image.aspectRatio,
  };

  return res;
};

export default handleIntrinsic;
