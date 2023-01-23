import { ImageGalleryPlugResult } from "./ImageGaleriePlug.query";
import GridGalerie from "./Variants/Grid/GridGalery";
import CarouselGallery from "./Variants/Carousel/CarouselGalery";
import React from "react";

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
