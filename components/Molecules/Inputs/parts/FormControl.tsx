import { FormDescription } from "./FormDescription";
import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";
import { InputWarp } from "./InputWrap";
import * as React from "react";

type FormControlProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof InputWarp> &
  React.ComponentProps<typeof FormError> &
  React.ComponentProps<typeof FormLabel> &
  React.ComponentProps<typeof FormDescription>;

const FormControl: React.FC<FormControlProps> = ({
  children,
  disabled,
  errorMessage,
  label,
  description,
  name,
}) => {
  return (
    <InputWarp disabled={disabled}>
      <FormLabel label={label} name={name} />
      {children}
      <FormDescription description={description} />
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};

export default FormControl;
