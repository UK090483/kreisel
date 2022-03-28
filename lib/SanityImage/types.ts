import { ImageProps } from "next/image";
import React from "react";

import { ImageMetaResult } from "./query";

export interface UseSanityImageOptions extends Omit<ImageProps, "src"> {}

export interface IImagePropsWithDimensions extends ImageProps {
  width: number;
  height: number;
}

export type checkInput = () => boolean;
export type UseSanityImage = (
  image?: ImageMetaResult | null,
  options?: UseSanityImageOptions
) => ImageProps | null;

export type SanityImageComponentProps = {
  image?: ImageMetaResult | null;
} & UseSanityImageOptions;

export type SanityImageComponent = React.FC<SanityImageComponentProps>;
