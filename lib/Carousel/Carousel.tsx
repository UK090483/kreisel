import * as React from "react";
import { CarouselContextProvider } from "./CarouselContext";

interface ICarouselProps {
  children: React.ReactNode | undefined;
  items: any[];
}

function Carousel(props: ICarouselProps) {
  const { children, items } = props;
  return (
    <CarouselContextProvider items={items}>{children}</CarouselContextProvider>
  );
}

export default Carousel;
