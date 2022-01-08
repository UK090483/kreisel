import React from "react";

type ShopButtonProps = {
  onClick: () => void;
};
export const ShopButton: React.FC<ShopButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className=" text-sm p-3 h-6 rounded-full flex justify-center items-center border-2 border-red text-red "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
