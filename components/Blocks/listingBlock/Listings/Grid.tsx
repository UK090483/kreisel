import { Section } from "@components/Section/Section";
import React from "react";
import { AppColor } from "types";

interface GridProps {
  bgColor?: AppColor;
}

export const Grid: React.FC<GridProps> = ({ children, bgColor }) => {
  return <>{children}</>;
};
