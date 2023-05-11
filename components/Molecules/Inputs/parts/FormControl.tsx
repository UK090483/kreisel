import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";
import { InputWarp } from "./InputWrap";
import * as React from "react";

type FormControlProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof InputWarp> &
  React.ComponentProps<typeof FormError> &
  React.ComponentProps<typeof FormLabel>;

const FormControl: React.FC<FormControlProps> = ({
  children,
  disabled,
  errorMessage,
  label,
  name,
}) => {
  return (
    <InputWarp disabled={disabled}>
      <FormLabel label={label} name={name} />
      {children}
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};

export default FormControl;
