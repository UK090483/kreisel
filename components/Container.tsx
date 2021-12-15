import clsx from "clsx";
import React from "react";

interface ContainerProps {
  className?: string;
  size?: "small" | "medium" | "large" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  size,
}) => {
  return (
    <div
      className={clsx(
        "mx-auto",
        {
          "max-w-4xl": size === "small",
          "max-w-6xl": size === "medium",
          "max-w-7xl": size === "large",
          "px-3": size !== "full",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
