import FormControl from "./parts/FormControl";
import { formClasses } from "./style";
import { useEffect } from "react";
import { Switch as HiSwitch } from "@headlessui/react";
import { useController, useFormContext } from "react-hook-form";
import clsx from "clsx";

type SwitchProps = {
  onChange: (value: boolean) => void;
  checked?: boolean;
  name?: string;
};
export function Switch(props: SwitchProps) {
  const { onChange, checked, name } = props;
  return (
    <HiSwitch
      data-test-id={`input_${name}`}
      id={name}
      checked={checked}
      onChange={onChange}
      className={clsx(
        "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full  transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
        formClasses.border,
        formClasses.bg
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={clsx(
          {
            "translate-x-9 bg-primary": checked,

            "translate-x-0 bg-primary-light": !checked,
          },
          `pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full  shadow-lg ring-0 transition duration-200 ease-in-out`
        )}
      />
    </HiSwitch>
  );
}

type SwitchInputProps = {
  name: string;
  label: string;
};

export const SwitchInput = (props: SwitchInputProps) => {
  const { name, label } = props;
  const { field } = useController({
    name,
  });
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    register(name);
  }, [register, name]);

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <FormControl
      disabled={isSubmitting}
      name={name}
      label={label}
      errorMessage={errorMessage}
    >
      <Switch name={name} checked={!!field.value} onChange={field.onChange} />
    </FormControl>
  );
};
