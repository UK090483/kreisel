import FormControl from "./parts/FormControl";
import { formClasses } from "./style";
import { useFormContext } from "react-hook-form";
import * as React from "react";
import clsx from "clsx";

type InputProps = {} & JSX.IntrinsicElements["input"] &
  Omit<React.ComponentProps<typeof FormControl>, "children">;

const Input: React.FC<InputProps> = (props) => {
  const { name, label, className, description } = props;
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
      description={description}
    >
      <input
        data-test-id={`input_${name}`}
        disabled={isSubmitting}
        type="text"
        {...register(name)}
        {...props}
        className={clsx(
          "rounded-full py-2",
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
