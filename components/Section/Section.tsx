import clsx from "clsx";
import React from "react";
import { AppColor } from "types";
import { SectionContextProvider } from "./SectionContext";
import Transition from "./Transition";
import useSectionWidth from "./useSectionWidth";

export interface SectionProps {
  width?: "full" | "m" | "l" | "s";
  bg?: AppColor;
  className?: string;
  id?: string;
  noPadding?: boolean;
  as?: "section" | "div";
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
}

export const Section: React.FC<SectionProps> = (props) => {
  const {
    children,
    width = "m",
    className,
    id,
    bg = "white",
    noPadding = false,
    as: Component = "section",
    transitionTop = null,
    transitionBottom = null,
  } = props;
  const widthClasses = useSectionWidth({ noPadding, width });

  return (
    <SectionContextProvider {...props}>
      <Transition pos="top" transition={transitionTop} color={bg} />
      <Component
        id={id}
        className={clsx(`w-full overflow-hidden  `, {
          "bg-white": bg === "white",
          "bg-primary": bg === "primary",
          "bg-primary-light": bg === "primary-light",
          "bg-secondary": bg === "secondary",
          "bg-secondary-light": bg === "secondary-light",
          " bg-grey": bg === "grey",
          " bg-grey-light": bg === "grey-light",
        })}
      >
        <div className={clsx("mx-auto", className, widthClasses)}>
          {children}
        </div>
      </Component>
      <Transition pos="bottom" transition={transitionBottom} color={bg} />
    </SectionContextProvider>
  );
};
