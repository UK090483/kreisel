/* eslint-disable react/display-name */
import clsx from "clsx";
import React, { InputHTMLAttributes, memo } from "react";
import {
  FieldValues,
  RegisterOptions,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { FieldContextProvider } from "./FieldContext";
import { FieldError } from "./FieldError";
import { FormLable } from "./FormLable";
import { Input } from "./Input";

export interface IFieldProps extends Pick<InputHTMLAttributes<any>, "type"> {
  name: string;
  lable?: string;
  placeholder?: string;
  options?: RegisterOptions;
}

const Field: React.FunctionComponent<IFieldProps> = (props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <FieldContextProvider {...props}>
      <div
        className={clsx("mb-4 w-full transition-all ", {
          "opacity-50 ": isSubmitting,
        })}
      >
        <FormLable />
        <Input />
        <FieldError />
      </div>
    </FieldContextProvider>
  );
};

export default Field;
