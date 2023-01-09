import Button from "@components/Button/Button";
import { linkQuery, LinkResult } from "PageBuilder/Navigation/query";

import React from "react";

export const buttonPlugQuery = `
_type == "button" => {
  _type,
  _key,
    label,
    inline,
    'link':link{
      ${linkQuery}
    }
}
`;

type ButtonType = {
  _type: "button";
  label?: string;
  link?: LinkResult;
  position?: "inline" | "left" | "right" | "center";
};

const ButtonPlug: React.FC<{ node: ButtonType }> = (props) => {
  const { link, label, position } = props.node;

  return (
    <Button
      href={link?.href || "/"}
      external={!!link?.external}
      className=" block"
    >
      {label}
    </Button>
  );
};

export default ButtonPlug;
export {};
