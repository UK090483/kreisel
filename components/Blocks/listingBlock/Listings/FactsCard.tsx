import Button from "@components/Button/Button";
import Typo from "@components/Typography";
import React, { useEffect, useState } from "react";

interface FactsCardProps {
  items: { header: string; text: string; image?: string }[];
  category: string;
}

const Indicator: React.FC<{ active: number; items: any[] }> = ({
  items,
  active,
}) => {
  return (
    <div className="flex ">
      {items.map((_i, index) => (
        <div
          key={index}
          className={`w-2.5 h-2.5 mr-1 border border-black rounded-full ${
            active === index ? "bg-black" : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export const FactsCard: React.FC<FactsCardProps> = ({
  items = [],
  category,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextItem = () => {
    setActiveIndex((i) => (i + 1) % items.length);
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden bg-salmon">
      <div className="flex items-center justify-between p-6">
        <Indicator items={items} active={activeIndex} /> <Typo>{category}</Typo>
      </div>

      <div
        style={{ transform: `translateX(${activeIndex * -100}%)` }}
        className="flex transition-transform"
      >
        {items &&
          items.map(({ header, text }, index) => {
            return (
              <div
                key={text}
                className={`flex-none w-full p-6 transition-opacity delay-200 duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Typo className="mb-6 " variant="h3">
                  {header}
                </Typo>
                <Typo>{text}</Typo>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-between p-6">
        <Button onClick={nextItem}> Weitere Fakten </Button>
      </div>
    </div>
  );
};
