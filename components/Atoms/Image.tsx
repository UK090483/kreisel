import ImageAdapter, {
  validateSrc as vS,
} from "components/Adapter/ImageAdapter";
import React from "react";

export type ImageSrc = unknown;

type ImageProps<T extends any = any> = {
  fill?: boolean;
  src: ImageSrc;
} & Omit<JSX.IntrinsicElements["img"], "src">;

export const validateSrc = (src: ImageSrc) => vS(src);

const Image = (props: ImageProps) => {
  return <ImageAdapter {...props} />;
};

export default Image;
