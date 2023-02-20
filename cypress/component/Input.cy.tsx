///<reference path="../support/component.tsx" />
import Input from "../../components/Inputs/input2";
import { renderInForm } from "../helpers/formHelper";
import React from "react";

describe("input.cy.tsx", () => {
  it("playground", () => {
    renderInForm(<Input name="test" label="Test" />);
    cy.get("input").type("bla");
    cy.get("form").submit();
    cy.get("@submit").should("have.been.calledWith", {
      test: "bla",
    });
  });
});
