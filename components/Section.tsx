import clsx from "clsx";
import React from "react";

interface SectionProps {
  width?: "full" | "m" | "l" | "s";
  bg?: "white" | "grey" | "black" | "primary" | "secondary";
  className?: string;
  id?: string;
  noPadding?: boolean;
  as?: "section" | "div";
}

export const Section: React.FC<SectionProps> = ({
  children,
  width = "m",
  className,
  id,
  bg = "white",
  noPadding = false,
  as: Component = "section",
}) => {
  return (
    <Component
      id={id}
      className={clsx(`w-full`, {
        "bg-white": bg === "white",
        "bg-primary": bg === "primary",
        "bg-secondary": bg === "secondary",
        "bg-gray-300": bg === "grey",
      })}
    >
      <div
        className={clsx("mx-auto overflow-hidden", className, {
          "max-w-screen-md ": width === "s",
          "max-w-screen-lg ": width === "m",
          "max-w-screen-xl ": width === "l",
          "px-4": width !== "full" && !noPadding,
        })}
      >
        {children}
      </div>
    </Component>
  );
};
