import getDefaultResult from "./getDefaultResult";
import { ImageMetaResult } from "../query";
import { UseSanityImageOptions } from "../types";
import { ImageProps } from "next/image";

const handleResponsive = (
  image: ImageMetaResult,
  options: UseSanityImageOptions
): ImageProps => {
  return { ...getDefaultResult(image) };
};

export default handleResponsive;
