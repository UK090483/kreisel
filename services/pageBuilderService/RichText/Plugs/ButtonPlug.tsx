import Button from "@components/Button/Button";

import {
  LinkResult,
  linkQuery,
} from "@services/pageBuilderService/queries/snippets";
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
  link: LinkResult;
  position?: "inline" | "left" | "right" | "center";
};

// export interface ButtonPlugResult extends Omit<ButtonType, "link"> {
//   link: LinkResult;
// }

// type ButtonPlugProps = ButtonPlugResult;
const ButtonPlug: React.FC<{ node: ButtonType }> = (props) => {
  const { link, label, position } = props.node;

  return (
    <Button href={link.href} external={link.external} onClick={() => {}}>
      {label}
    </Button>
  );
};

export default ButtonPlug;
export {};
