import FormControl from "./parts/FormControl";
import { useFormContext } from "react-hook-form";

type TextareaProps = {
  name: string;
  label: string;
} & JSX.IntrinsicElements["textarea"];

const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, className } = props;
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <FormControl
      errorMessage={errorMessage}
      name={name}
      label={label}
      disabled={isSubmitting}
    >
      <textarea
        data-test-id={`input_${name}`}
        disabled={isSubmitting}
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
    </FormControl>
  );
};

export default Textarea;
