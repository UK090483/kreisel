import Carousel from "@lib/Carousel/Carousel";
import CarouselItem from "@lib/Carousel/CarouselItem";
import CarouselItemWrap from "@lib/Carousel/CarouselItemWrap";
import Dots from "@lib/Carousel/Dots";
import Navigation from "@lib/Carousel/Navigation";
import clsx from "clsx";
import * as React from "react";

import { ImageGalleryPlugResult } from "../../ImageGalerieQuery";
import CarouselGalerieItem from "./CarouselGalerieItem";

const CarouselGallery: React.FunctionComponent<ImageGalleryPlugResult> = (
  props
) => {
  const { items, rows = 4, rows_mobile = 2, ratio = "1:1" } = props;
  return (
    <div>
      <Carousel items={items}>
        <Navigation>
          <ul className="w-full grid grid-cols-1 grid-rows-1">
            {items.map((item, index) => (
              <CarouselItem index={index} key={item._key}>
                <CarouselGalerieItem {...item} />
              </CarouselItem>
            ))}
          </ul>
        </Navigation>
        <Dots></Dots>
      </Carousel>
    </div>
  );
};

export default CarouselGallery;
