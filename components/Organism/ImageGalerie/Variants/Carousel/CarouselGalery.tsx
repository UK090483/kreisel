import CarouselGalerieItem from "./CarouselGalerieItem";
import { IImageGalleryProps } from "../../ImageGalerie";
import Carousel from "components/Molecules/Carousel/Carousel";
import * as React from "react";

const CarouselGallery: React.FunctionComponent<IImageGalleryProps> = (
  props
) => {
  const { items } = props;
  return (
    <Carousel slides={1} slidesMobile={1}>
      {items.map((item) => (
        <div key={item._key}>
          <CarouselGalerieItem {...item} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselGallery;
