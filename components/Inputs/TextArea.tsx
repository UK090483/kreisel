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

  return (
    <div className="flex  flex-col  gap-2 py-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
      <p className="text-red">{errors[name] && errors[name]}</p>
    </div>
  );
};

export default Textarea;
