import Svg from "@components/Svg";
import Typo from "@components/Typography/Typography";
import React, { FC, useState } from "react";

type AccodionProps = {
  condition: boolean;
  title?: string;
};

const Accordion: FC<AccodionProps> = ({ condition, children, title }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (!condition) return <>{children}</>;

  return (
    <div
      className={`relative group ${
        open ? "max-h-[999px]" : "max-h-16 "
      }    transition-all overflow-hidden `}
    >
      <div
        className={` w-full transition-colors bg-primary  ${
          open ? " delay-200 duration-700" : ""
        }      z-10 `}
      >
        <div
          onClick={handleClick}
          className=" max-w-screen-lg mx-auto h-16 flex items-center bg-primary  font-bold"
        >
          <Svg
            icon="chevronRight"
            className={`transition-transform border-2 p-0.5 mr-6 rounded-full border-black ${
              open ? "rotate-90" : ""
            }`}
          />
          {title}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Accordion;
