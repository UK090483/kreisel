import { ImageUpload } from "components/Molecules/Inputs/ImageUpload";
import React from "react";

const sizes: Cypress.ViewportPreset[] = ["iphone-5", "macbook-13"];

describe("<ImageUploadInput />", () => {
  it("should render without image", () => {
    cy.mount(
      <ImageUpload
        name="image"
        onErase={async () => true}
        onSave={async () => true}
      />
    );
    cy.get('[data-testid="imagePlaceholder"]').should("be.visible");
    cy.get('[aria-label="upload Image"]').should("be.visible");
  });

  sizes.forEach((size) => {
    it(`should render with image size: ${size}`, () => {
      cy.viewport(size);
      cy.mount(
        <ImageUpload
          name="image"
          image={Cypress.env("image").url}
          onErase={async () => true}
          onSave={async () => true}
        />
      );
      cy.get("img")
        .should("be.visible")
        .should("have.attr", "src", Cypress.env("image").url);

      cy.get('[aria-label="update Image"]').should("be.visible");
      cy.get('[aria-label="remove Image"]').should("be.visible");
    });
  });

  it("should erase Image", () => {
    cy.log(Cypress.env("image").url);
    cy.mount(
      <ImageUpload
        name="image"
        image={Cypress.env("image").url}
        onErase={async () => true}
        onSave={async () => true}
      />
    );

    cy.get('[aria-label="remove Image"]').should("be.visible").click();

    cy.get('[aria-label="upload Image"]').should("be.visible");
    cy.get('[data-testid="imagePlaceholder"]').should("be.visible");
  });

  it("should handle input", () => {
    cy.mount(
      <ImageUpload
        name="image"
        image={Cypress.env("image").url}
        onErase={async () => true}
        onSave={async () => true}
      />
    );
    cy.get(`input[type=file]`).selectFile("cypress/fixtures/image.png", {
      force: true,
    });
  });
});
