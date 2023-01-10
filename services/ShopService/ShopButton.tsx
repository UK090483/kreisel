import React, { PropsWithChildren } from "react";

type ShopButtonProps = {
  onClick: () => void;
  round?: boolean;
  color?: "accent" | "white";
};
export const ShopButton: React.FC<PropsWithChildren<ShopButtonProps>> = ({
  children,
  onClick,
  round,
  color,
}) => {
  return (
    <button
      className={`${round ? "h-6 w-6" : "p-3  h-6"} ${
        color === "accent" ? "border-red text-red " : "border-white bg-white"
      } text-sm  rounded-full flex justify-center items-center border-2  `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
