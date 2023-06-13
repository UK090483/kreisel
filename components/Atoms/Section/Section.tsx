import { SectionContextProvider } from "./SectionContext";
import Transition from "./Transition";
import useSectionWidth from "./useSectionWidth";

import React, { PropsWithChildren } from "react";
import clsx from "clsx";

export interface ISectionProps {
  width?: "full" | "m" | "l" | "s" | null;
  bgColor?: string | null;
  className?: string;
  id?: string;
  noPadding?: boolean;
  as?: "section" | "div";
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
  children?: React.ReactNode;
}

const Section: React.FC<PropsWithChildren<ISectionProps>> = (props) => {
  const {
    children,
    width = "m",
    className,
    id,
    bgColor = "white",
    noPadding = false,
    as: Component = "section",
    transitionTop = null,
    transitionBottom = null,
  } = props;

  const widthClasses = useSectionWidth({ noPadding, width });

  return (
    <SectionContextProvider {...props}>
      <Transition pos="top" transition={transitionTop} color={bgColor} />
      <Component
        id={id}
        className={clsx(`w-full overflow-hidden  `, {
          "bg-white": bgColor === "white",
          "bg-primary": bgColor === "primary",
          "bg-primary-light": bgColor === "primary-light",
          "bg-primary-xLight": bgColor === "primary-xLight",
          "bg-secondary": bgColor === "secondary",
          "bg-secondary-light": bgColor === "secondary-light",
          "bg-grey": bgColor === "grey",
          "bg-grey-light": bgColor === "grey-light",
        })}
      >
        <div className={clsx("mx-auto break-words", className, widthClasses)}>
          {children}
        </div>
      </Component>
      <Transition pos="bottom" transition={transitionBottom} color={bgColor} />
    </SectionContextProvider>
  );
};

export default Section;
