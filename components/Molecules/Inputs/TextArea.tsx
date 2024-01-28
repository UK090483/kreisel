import FormControl from "./parts/FormControl";
import { formClasses } from "./style";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

type TextareaProps = { max?: number } & JSX.IntrinsicElements["textarea"] &
  Omit<React.ComponentProps<typeof FormControl>, "children">;

const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, description, className, max } = props;
  const {
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useFormContext();

  const value = watch(name);
  const count = value ? value.length : false;

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <FormControl
      errorMessage={errorMessage}
      name={name}
      label={label}
      disabled={isSubmitting}
      description={description}
    >
      <textarea
        data-test-id={`input_${name}`}
        disabled={isSubmitting}
        {...register(name)}
        {...props}
        className={clsx(
          "rounded-full",
          formClasses.bg,
          formClasses.border,
          formClasses.rounded,
          className
        )}
        id={name}
      />
      {max && count && <div className=" text-sm ">{count + "/" + max}</div>}
    </FormControl>
  );
};

export default Textarea;
