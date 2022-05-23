import * as React from "react";
import { useState } from "react";
import { ICarouselContextState, useCarousel } from "./CarouselContext";

interface ICarouselItemWrapProps {
  delay?: number;
  children: (props: {
    activeItem: number;
    animateIn: boolean;
    animateOut: boolean;
    animateOutIndex: number | null;
  }) => React.ReactElement;
}

function CarouselItemWrap(props: ICarouselItemWrapProps) {
  const { children, delay = 500 } = props;

  const { activeItem: _active, next } = useCarousel();

  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const [animateOutIndex, setAnimateOutIndex] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState(0);

  React.useEffect(() => {
    setAnimateOutIndex(activeItem);
    setAnimateOut(true);
    const timeOut = setTimeout(() => {
      setActiveItem(_active);
      setAnimateOut(false);
      setAnimateOutIndex(null);
    }, delay);
    return () => {
      clearTimeout(timeOut);
    };
  }, [_active, activeItem, delay]);

  React.useEffect(() => {
    if (animateOut) return;
    const timeOut = setTimeout(() => {
      setAnimateIn(true);
    }, delay / 2);
    return () => {
      clearTimeout(timeOut);
    };
  }, [animateOut, delay]);

  return (
    <ul onClick={next} className="w-full grid grid-cols-1 grid-rows-1">
      {children &&
        children({
          activeItem,
          animateIn,
          animateOut,
          animateOutIndex,
        })}
    </ul>
  );
}

export default CarouselItemWrap;
