import { SectionProps } from "components/Section/Section";
import useSectionWidth from "components/Section/useSectionWidth";
import Svg from "components/Svg";
import { useScrollTo } from "hooks/useScrollTo";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSessionStorage } from "react-use";

type AccordionProps = {
  condition: boolean;
  title?: string;
  width: SectionProps["width"];
  children?: React.ReactNode;
  id: string;
};

const initialHeight = 64;

const Accordion: FC<AccordionProps> = ({
  condition,
  children,
  title,
  width,
  id,
}) => {
  const [containerHeight, setContainerHeight] = useState(initialHeight);
  const ref = useRef<HTMLDivElement>(null);
  const widthClasses = useSectionWidth({ width, noPadding: false });
  const scrollTo = useScrollTo(500);

  const [open, setOpen] = useSessionStorage("accordion_" + id, false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { height, top } = rect;
    setContainerHeight(height);
    scrollTo(scrollY + (top - 200));
  }, [open, scrollTo, ref]);

  if (!condition) return <>{children}</>;

  return (
    <div
      data-container-open={open}
      style={{
        maxHeight: open ? containerHeight + initialHeight : initialHeight,
      }}
      className={`relative max-h-16 overflow-hidden transition-all duration-500`}
    >
      <div
        className={`w-full bg-primary-light pl-3 shadow-lg transition-colors  ${
          open ? " delay-200 duration-700" : ""
        }      z-10 `}
      >
        <button
          onClick={handleClick}
          className={
            ` mx-auto flex h-16 w-full items-center bg-primary-light font-bold ` +
            widthClasses
          }
        >
          <Svg
            icon="chevronRight"
            className={`mr-6 flex-shrink-0 rounded-full border-2 border-black  p-0.5 transition-transform ${
              open ? "rotate-90" : ""
            }`}
          />
          <h3 className=" text-left ">{title}</h3>
        </button>
      </div>
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default Accordion;
