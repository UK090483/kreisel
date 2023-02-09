import { mount } from "cypress/react18";
import { cy, it, expect } from "local-cypress";
import { PropsWithChildren } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";

const FormTestWrap = (props: {
  formProps?: PropsWithChildren<UseFormProps>;
  children: React.ReactElement;
  onSubmit: (values: any) => {};
}) => {
  const { children, formProps, onSubmit } = props;
  const methods = useForm({ ...formProps });

  const data = { values: methods.getValues() };

  return (
    <>
      <div className="" id="data">
        {JSON.stringify(data)}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          {children}
        </form>
      </FormProvider>
    </>
  );
};

export { mount, cy, it, expect, FormTestWrap };
