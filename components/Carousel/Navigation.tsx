import { IconButton } from "components/Button/Button";
import Svg from "components/Svg";
import React from "react";

type NavigationProps = {
  next?: () => void;
  prev?: () => void;
  className?: string;
};
const Navigation: React.FC<NavigationProps> = (props) => {
  const { className, next, prev } = props;

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex w-full rotate-180 items-end justify-between md:items-center ${className}`}
    >
      <IconButton
        aria-label="carousel button previous"
        icon="chevronRight"
        onClick={prev}
        className="rotate-180 lg:-translate-x-4"
      />

      <IconButton
        aria-label="carousel button next"
        icon="chevronRight"
        onClick={next}
        className="lg:translate-x-4"
      />
    </div>
  );
};

export default Navigation;
const Arrow = () => {
  return <Svg icon="chevronRight" size="m" pathProps={{ strokeWidth: 3 }} />;
};
