import { renderInForm } from "../../helpers/formHelper";
import Input from "components/Inputs/Input";
import React from "react";

describe("<Input/>", () => {
  it("should Render Label", () => {
    renderInForm(<Input name="test" label="Test" />);
    cy.get("label").should("have.text", "Test");
  });
  it("should Render Description", () => {
    renderInForm(<Input name="test" label="Test" />);
    cy.get("label").should("have.text", "Test");
  });
  it("should handle input", () => {
    renderInForm(<Input name="test" label="Test" />);
    cy.get("input").type("bla");
    cy.get("form").submit();
    cy.get("@submit").should("have.been.calledWith", {
      test: "bla",
    });
  });
});
