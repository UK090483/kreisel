import React from "react";

import clsx from "clsx";

import ImageGalleryItem from "./Variants/Grid/GridGalerieItem";

import { ImageGalleryPlugResult } from "./ImageGalerieQuery";
import GridGalerie from "./Variants/Grid/GridGalery";
import CarouselGallery from "./Variants/Carousel/CarouselGalery";

const ImageGalleryPlug: React.FC<{ node: ImageGalleryPlugResult }> = (
  props
) => {
  const {
    items,
    rows = 4,
    rows_mobile = 2,
    ratio = "1:1",
    variant,
  } = props.node;

  if (!items || items.length < 1) return <div>No Images</div>;

  if (variant === "grid" || !!!variant) {
    return <GridGalerie {...props.node} />;
  }
  if (variant === "carousel") {
    return <CarouselGallery {...props.node} />;
  }

  return null;
};

export default ImageGalleryPlug;
