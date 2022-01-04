import Typo from "@components/Typography/Typography";
import React from "react";

const CardTitle: React.FC = ({ children }) => {
  return <Typo bold>{children}</Typo>;
};
export default CardTitle;
