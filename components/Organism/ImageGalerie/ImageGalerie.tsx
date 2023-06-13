import GridGalerie from "./Variants/Grid/GridGalery";
import CarouselGallery from "./Variants/Carousel/CarouselGalery";

import { ImageSrc } from "components/Atoms/Image";
import { LinkSource } from "components/Atoms/Link";
import React from "react";

export interface ImageGalleryItemProps {
  title?: string;
  size?: "m" | "l";
  image?: ImageSrc;
  link?: LinkSource;
  contain?: boolean;
  bgColor?: string;
  _key: string;
}

export interface IImageGalleryProps {
  name?: string;
  rows?: number;
  rows_mobile?: number;
  ratio?: "1:1" | "16:9" | "2:3" | "3:2";
  items: ImageGalleryItemProps[];
  variant?: string;
}

const ImageGalleryPlug: React.FC<IImageGalleryProps> = (props) => {
  const { items, variant } = props;

  if (!items || items.length < 1) return null;

  if (variant === "grid" || !!!variant) {
    return <GridGalerie {...props} />;
  }
  if (variant === "carousel") {
    return <CarouselGallery {...props} />;
  }

  return null;
};

export default ImageGalleryPlug;
