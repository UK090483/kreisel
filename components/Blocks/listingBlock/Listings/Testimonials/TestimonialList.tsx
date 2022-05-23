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

  const [item, setItem] = React.useState<[number, number]>([0, -1]);

  console.log(items);

  const [animate, setAnimate] = React.useState<null | "out" | "in">(null);

  const nextItem = () => {
    setAnimate("out");
    setItem([(item[0] + 1) % items.length, item[1]]);
  };

  React.useEffect(() => {
    if (item[0] === -1) return;
  }, [item]);

  if (items.length < 1) return null;

  return (
    <Carousel items={items}>
      <Navigation>
        <CarouselItemWrap>
          {({ activeItem }) => (
            <div className=" grid grid-cols-1 grid-rows-1">
              {items.map((i, index) => {
                return (
                  <CarouselItem key={i._id} index={index}>
                    <TestimonialListItem {...items[index]}>
                      <Dots className=" lg:hidden  " />
                    </TestimonialListItem>
                  </CarouselItem>
                );
              })}
            </div>
          )}
        </CarouselItemWrap>
      </Navigation>
      <Dots className="hidden lg:flex " />
    </Carousel>
  );
};

export default TestimonialList;
