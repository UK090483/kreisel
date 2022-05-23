import clsx from "clsx";
import * as React from "react";
import { useCarousel } from "./CarouselContext";

interface ICarouselItemProps {
  index: number;
}

const CarouselItem: React.FunctionComponent<ICarouselItemProps> = ({
  children,
  index,
}) => {
  const { activeItem } = useCarousel();
  return (
    <li
      className={clsx(
        " col-span-1 col-start-1 row-span-1 row-start-1 transition-opacity  opacity-100",
        { "opacity-0": index !== activeItem }
      )}
    >
      {children}
    </li>
  );
};

export default CarouselItem;
