import Image from "../Atoms/Image";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import { ImageResult } from "PageBuilder/Image/sanityImage.query";
import React from "react";

const ImageAdapter = (props: React.ComponentProps<typeof Image>) => {
  // @ts-ignore
  return <SanityImage {...props} />;
};
export const validateSrc = (src: unknown) => {
  const _src = src as ImageResult;
  return Boolean(_src?.url);
};

export default ImageAdapter;
