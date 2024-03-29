import * as React from "react";

type DotsProps = {
  className?: string;
  itemCount: number;
  activeItem: number;
  set: (index: number) => void;
};
const Dots: React.FC<DotsProps> = (props) => {
  const { className, itemCount, activeItem, set } = props;

  const dots = React.useMemo(() => new Array(itemCount).fill("a"), [itemCount]);
  if (itemCount < 2) return <></>;
  return (
    <div
      className={`flex justify-center items-center -translate-y-6 h-0  ${className}`}
    >
      {dots.map((i, index) => (
        <div
          onClick={() => set(index)}
          key={index}
          className={`w-3 h-3 mx-0.5 rounded-full  border-[0.5px] transition-colors border-current ${
            activeItem === index ? "bg-current" : " bg-transparent"
          }`}
        />
      ))}
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Dots;
