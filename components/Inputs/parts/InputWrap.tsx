import clsx from "clsx";
import * as React from "react";

export type InputWarpProps = {
  disabled?: boolean;
};

export const InputWarp: React.FC<InputWarpProps> = ({ children, disabled }) => {
  return (
    <div
      className={clsx("flex flex-col gap-2 py-2 ", {
        "opacity-25": disabled,
      })}
    >
      {children}
    </div>
  );
};
