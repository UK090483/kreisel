import { FormError } from "./parts/FormError";
import { FormLabel } from "./parts/FormLabel";
import { InputWarp } from "./parts/InputWrap";
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
    <InputWarp disabled={isSubmitting}>
      <FormLabel name={name} label={label} />
      <textarea
        disabled={isSubmitting}
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};

export default Textarea;
