import { ImageGalleryPlugResult } from "./ImageGaleriePlug.query";
import GridGalerie from "./Variants/Grid/GridGalery";
import CarouselGallery from "./Variants/Carousel/CarouselGalery";
import React from "react";

const ImageGalleryPlug: React.FC<ImageGalleryPlugResult> = (props) => {
  const { items, rows = 4, rows_mobile = 2, ratio = "1:1", variant } = props;

  if (!items || items.length < 1) return <div>No Images</div>;

  if (variant === "grid" || !!!variant) {
    return <GridGalerie {...props} />;
  }
  if (variant === "carousel") {
    return <CarouselGallery {...props} />;
  }

  return null;
};

export default ImageGalleryPlug;
