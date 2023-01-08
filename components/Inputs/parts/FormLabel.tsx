import * as React from "react";

export type IFormLabelProps = {
  name: string;
  label: string;
} & JSX.IntrinsicElements["label"];

export function FormLabel({ name, label, ...rest }: IFormLabelProps) {
  return (
    <label htmlFor={name} {...rest}>
      {label}
    </label>
  );
}
