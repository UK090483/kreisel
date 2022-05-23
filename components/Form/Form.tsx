import * as React from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
  UseFormProps,
} from "react-hook-form";
interface IFormProps<TFieldValues extends FieldValues> {
  onSubmit: SubmitHandler<TFieldValues>;
  children?: React.ReactNode | undefined;
  options?: UseFormProps<TFieldValues>;
  className?: string;
}

function Form<TFieldValues extends FieldValues>(
  props: IFormProps<TFieldValues>
) {
  const { children, options, className, onSubmit } = props;
  const methods = useForm<TFieldValues>(options);

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
export default Form;
