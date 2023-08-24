import ImageAdapter, {
  validateSrc as vS,
  imageSource,
} from "components/Adapter/ImageAdapter";
import React from "react";

export type ImageSrc = imageSource;

type ImageProps<T extends any = any> = {
  fill?: boolean;
  src: ImageSrc;
  alt: string;
} & Omit<JSX.IntrinsicElements["img"], "src">;

export const validateSrc = (src: ImageSrc) => vS(src);

const Image = (props: ImageProps) => {
  return <ImageAdapter {...props} />;
};

export default Image;
