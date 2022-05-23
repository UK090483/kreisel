import React from "react";
import { useFormContext } from "react-hook-form";
import { useFieldContext } from "./FieldContext";

export const FieldError: React.FC = () => {
  const { name } = useFieldContext();
  const {
    formState: { errors },
  } = useFormContext();
  if (!errors[name]) return null;
  return (
    <p className="text-red text-xs italic">
      {errors[name].message || "something is wrong"}
    </p>
  );
};
