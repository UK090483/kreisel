import FormControl from "./parts/FormControl";
import { formClasses } from "./style";
import { useFormContext } from "react-hook-form";
import * as React from "react";
import clsx from "clsx";

type InputProps = {
  name: string;
  label?: string;
  description?: string;
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
    <FormControl
      disabled={isSubmitting}
      name={name}
      label={label}
      errorMessage={errorMessage}
    >
      <input
        data-test-id={`input_${name}`}
        disabled={isSubmitting}
        type="text"
        {...register(name)}
        {...props}
        className={clsx(
          "rounded-full",
          formClasses.roundedFull,
          formClasses.bg,
          formClasses.border,
          className
        )}
        id={name}
      />
    </FormControl>
  );
};
export default Input;
