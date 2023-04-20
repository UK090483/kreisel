import { ImageUploadInput } from "../../../components/Inputs/ImageUpload";
import { renderInForm } from "../../helpers/formHelper";
import React from "react";

describe("<ImageUploadInput />", () => {
  it("should render without image", () => {
    renderInForm(<ImageUploadInput name="image" label="Image" />);
    cy.get('[data-testid="imagePlaceholder"]').should("be.visible");
  });

  it("should render with image", () => {
    renderInForm(<ImageUploadInput name="image" label="Image" />, {
      formProps: {
        values: { image: { url: Cypress.env("image").url } },
      },
    });

    cy.get("img")
      .should("be.visible")
      .should("have.attr", "src", Cypress.env("image").url);
  });

  it.only("should erase Image", () => {
    renderInForm(<ImageUploadInput name="image" label="Image" />, {
      formProps: {
        values: { image: { url: Cypress.env("image").url } },
      },
    });

    cy.get('[aria-label="remove Image"]').should("be.visible").click();
    cy.get("form").submit();

    cy.get("@submit").should("have.been.calledWith", {
      image: {
        url: null,
        erased: true,
      },
    });
  });

  it("should handle input", () => {
    renderInForm(<ImageUploadInput name="image" label="Image" />);

    cy.get(`input[type=file]`).selectFile("cypress/fixtures/image.png", {
      force: true,
    });

    cy.get("#data").then((i) => {
      cy.log(JSON.parse(i.contents().text()));
    });

    cy.get("form").submit();

    cy.get("@submit").should("have.been.calledWith", {
      image: {
        url: Cypress.sinon.match.string,
        file: Cypress.sinon.match({
          type: "image/png",
          name: "image.png",
          lastModified: Cypress.sinon.match.number,
        }),
      },
    });
  });
});
