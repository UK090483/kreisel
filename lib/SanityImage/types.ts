import { ImageMetaResult } from "./query";
import { ImageProps } from "next/legacy/image";
import React from "react";


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
