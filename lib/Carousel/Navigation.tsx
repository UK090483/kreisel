import React from "react";
import { useCarousel } from "./CarouselContext";

type NavigationProps = {
  onNext?: () => void;
  onPrev?: () => void;
  className?: string;
  count?: number;
};
export const Navigation: React.FC<NavigationProps> = (props) => {
  const { children, className } = props;
  const { next, prev, itemCount } = useCarousel();
  if (itemCount < 2) return <></>;

  return (
    <div className={`w-full flex  justify-between ${className}`}>
      <button
        className=" px-3 "
        onClick={prev}
        aria-label="carousel button previous"
      >
        <Arrow />
      </button>
      {children}
      <button
        className=" px-3  rotate-180 "
        onClick={next}
        aria-label="carousel button next"
      >
        <Arrow />
      </button>
    </div>
  );
};

export default Navigation;
const Arrow = () => {
  return (
    <svg
      className=" h-16 md:h-32  fill-current"
      viewBox="0 0 58 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M35.1516 0.726865L7.31388e-07 71.7293L35.1516 142.735L58 142.735L28.7251 84.5284L22.1227 71.7345L28.7244 58.9334L58 0.726868L35.1516 0.726865Z" />
    </svg>
  );
};
