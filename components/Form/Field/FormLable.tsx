import React from "react";
import { useFieldContext } from "./FieldContext";

export const FormLable: React.FC = () => {
  const { lable, name } = useFieldContext();
  if (!lable) return null;
  return (
    <label className="block" htmlFor={name}>
      {lable}
    </label>
  );
};
