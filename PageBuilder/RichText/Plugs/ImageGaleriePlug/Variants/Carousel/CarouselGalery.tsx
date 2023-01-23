import CarouselGalerieItem from "./CarouselGalerieItem";
import { ImageGalleryPlugResult } from "../../ImageGaleriePlug.query";
import Carousel from "components/Carousel/Carousel";

import * as React from "react";

const CarouselGallery: React.FunctionComponent<ImageGalleryPlugResult> = (
  props
) => {
  const { items } = props;
  return (
    <Carousel slides={1} slidesMobile={1}>
      {items.map((item, index) => (
        <div key={item._key}>
          <CarouselGalerieItem {...item} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselGallery;
