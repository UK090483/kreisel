import React from "react";
import { HiArrowLeft } from "react-icons/hi";

type NavigationProps = {
  next?: () => void;
  prev?: () => void;
  className?: string;
};
export const Navigation: React.FC<NavigationProps> = (props) => {
  const { className, next, prev } = props;

  return (
    <div className={`w-full  flex flex-col items-end mt-8 ${className}`}>
      <div>
        <button
          className="p-3 border-2 border-current rounded-full mr-4"
          onClick={prev}
          aria-label="carousel button previous"
        >
          <Arrow />
        </button>
        <button
          className="p-3  rotate-180 border-2 border-current rounded-full"
          onClick={next}
          aria-label="carousel button next"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
const Arrow = () => {
  return <HiArrowLeft size={12} />;
};
