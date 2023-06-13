"use client";
import React from "react";

const useHover = () => {
  const [value, setValue] = React.useState(false);

  const onMouseOver = () => setValue(true);
  const onMouseOut = () => setValue(false);

  return { isHovered: value, hoverProps: { onMouseOver, onMouseOut } };
};

export default useHover;
