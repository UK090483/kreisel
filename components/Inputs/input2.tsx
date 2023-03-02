import { FormError } from "./parts/FormError";
import { FormLabel } from "./parts/FormLabel";
import { InputWarp } from "./parts/InputWrap";
import { useFormContext } from "react-hook-form";
import * as React from "react";

type InputProps = {
  name: string;
  label: string;
} & JSX.IntrinsicElements["input"];

const Input: React.FC<InputProps> = (props) => {
  const { name, label, className } = props;
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <InputWarp disabled={isSubmitting}>
      <FormLabel name={name} label={label} />
      <input
        data-test-id={`input_${name}`}
        disabled={isSubmitting}
        type="text"
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};
export default Input;
