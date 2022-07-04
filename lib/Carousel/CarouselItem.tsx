import clsx from "clsx";
import * as React from "react";
import { useAnimatedCarousel, useCarousel } from "./CarouselContext";

interface ICarouselItemProps {
  index: number;
}

const CarouselItem: React.FunctionComponent<ICarouselItemProps> = ({
  children,
  index,
}) => {
  const { activeItem, animateInItem, animateOutItem } = useAnimatedCarousel();
  const active = index === activeItem;
  const animateIn = index === animateInItem;
  const animateOut = index === animateOutItem;

  return (
    <li
      className={clsx(
        " list-none col-span-1 col-start-1 row-span-1 row-start-1 transition-opacity opacity-0 ",
        {
          "opacity-100": active && !animateOut,
        }
      )}
    >
      {children}
    </li>
  );
};

export default CarouselItem;
