import { ImageUploadInput } from "./ImageUpload";
import { cy, FormTestWrap, mount } from "../../testPrepare";
import React, { ComponentProps } from "react";
import { UseFormProps } from "react-hook-form";

const render = (overwrite?: {
  compProps?: Partial<ComponentProps<typeof ImageUploadInput>>;
  formProps?: UseFormProps;
}) =>
  mount(
    <FormTestWrap
      onSubmit={cy.stub().as("submit")}
      formProps={overwrite?.formProps}
    >
      <ImageUploadInput name="image" label="Image" {...overwrite?.compProps} />
    </FormTestWrap>
  );

describe("<ImageUploadInput />", () => {
  it("renders", () => {
    render();

    cy.get(`input[type=file]`).selectFile("cypress/fixtures/image.png", {
      force: true,
    });

    cy.get("#data").then((i) => {
      cy.log(JSON.parse(i.contents().text()));
    });

    // cy.get("form").submit();

    // cy.get("@submit").should("have.been.calledWith", {
    //   image: "",
    // });
  });
});
