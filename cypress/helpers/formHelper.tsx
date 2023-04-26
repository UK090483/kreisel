import React, { PropsWithChildren } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { mount } from "cypress/react18";

const FormTestWrap = (props: {
  formProps?: PropsWithChildren<UseFormProps>;
  children: React.ReactElement;
  onSubmit: (values: any) => {};
}) => {
  const { children, formProps, onSubmit } = props;
  const methods = useForm({ ...formProps });
  const values = methods.watch();
  const data = { values, dirtyFields: methods.formState.dirtyFields };

  return (
    <>
      {/* <div className="" id="data">
        {JSON.stringify(data)}
      </div> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          {children}
        </form>
      </FormProvider>
    </>
  );
};

const renderInForm = (
  component: React.ReactElement,
  props?: {
    formProps?: PropsWithChildren<UseFormProps>;
  }
) => {
  return mount(
    <FormTestWrap
      onSubmit={cy.stub().as("submit")}
      formProps={props?.formProps}
    >
      {component}
    </FormTestWrap>
  );
};

type FormProps = UseFormProps;

export { FormTestWrap, renderInForm, FormProps };
