import clsx from "clsx";
import React from "react";
import Transition from "./Transition";

interface SectionProps {
  width?: "full" | "m" | "l" | "s";
  bg?: "white" | "grey" | "black" | "primary" | "secondary";
  className?: string;
  id?: string;
  noPadding?: boolean;
  as?: "section" | "div";
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
}

export const Section: React.FC<SectionProps> = ({
  children,
  width = "m",
  className,
  id,
  bg = "white",
  noPadding = false,
  as: Component = "section",
  transitionTop = null,
  transitionBottom = null,
}) => {
  return (
    <>
      <Transition pos="top" transition={transitionTop} color={bg} />
      <Component
        id={id}
        className={clsx(`w-full overflow-hidden `, {
          "bg-white": bg === "white",
          "bg-primary": bg === "primary",
          "bg-secondary": bg === "secondary",
          " bg-grey": bg === "grey",
        })}
      >
        <div
          className={clsx("mx-auto", className, {
            "max-w-screen-md ": width === "s",
            "max-w-screen-lg ": width === "m",
            "max-w-screen-xl ": width === "l",
            "px-4": width !== "full" && !noPadding,
          })}
        >
          {children}
        </div>
      </Component>
      <Transition pos="bottom" transition={transitionBottom} color={bg} />
    </>
  );
};
