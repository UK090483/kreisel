/* eslint-disable react/display-name */
import clsx from "clsx";
import * as React from "react";

type IInputProps = {
  unStyled?: boolean;
} & JSX.IntrinsicElements["input"];

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { className, unStyled = false, ...rest } = props;

  return (
    <input
      ref={ref}
      className={clsx(className, {
        "rounded-theme border-2 border-black bg-primary-light placeholder:text-black ":
          !unStyled,
      })}
      {...rest}
    />
  );
});

export default Input;
