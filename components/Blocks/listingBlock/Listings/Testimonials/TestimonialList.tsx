import Carousel from "@lib/Carousel/Carousel";
import CarouselItem from "@lib/Carousel/CarouselItem";
import CarouselItemWrap from "@lib/Carousel/CarouselItemWrap";
import Dots from "@lib/Carousel/Dots";
import Navigation from "@lib/Carousel/Navigation";
import clsx from "clsx";
import React from "react";
import { ITestimonialItem } from "../../listingBlockQuery";
import TestimonialListItem from "./TestimonialListItem";

interface ITestimonialListProps {
  items: ITestimonialItem[];
}

const TestimonialList: React.FunctionComponent<ITestimonialListProps> = (
  props
) => {
  const { items = [] } = props;

  if (items.length < 1) return null;

  return (
    <Carousel items={items}>
      <Navigation>
        <div className=" grid grid-cols-1 grid-rows-1 text-black ">
          {items.map((i, index) => {
            return (
              <CarouselItem key={i._id} index={index}>
                <TestimonialListItem index={index} {...items[index]}>
                  {/* <Dots className="lg:hidden" /> */}
                </TestimonialListItem>
              </CarouselItem>
            );
          })}
        </div>
      </Navigation>
      <Dots />
    </Carousel>
  );
};

export default TestimonialList;
