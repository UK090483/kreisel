import { FormError } from "./parts/FormError";
import { useFormContext } from "react-hook-form";

type TextareaProps = {
  name: string;
  label: string;
} & JSX.IntrinsicElements["textarea"];

const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, className } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="flex  flex-col  gap-2 py-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
      <FormError errorMessage={errorMessage} />
    </div>
  );
};

export default Textarea;
