import { DropdownInput } from "../../../components/Inputs/Dropdown";
import { renderInForm, FormProps } from "../../helpers/formHelper";
import React from "react";

const testItems = Array.from(Array(5).keys()).map((_i, index) => ({
  value: `value_${index}`,
  title: `title_${index}`,
}));

const render = (formProps?: FormProps) => {
  renderInForm(
    <DropdownInput label="Test Field" name="test" items={testItems} />,
    { formProps }
  );
};

describe("<DropdownInput />", () => {
  it("renders", () => {
    render();
    cy.get("button  > ul").first().should("have.text", "bitte wählen");
    cy.get("form").submit();
    cy.get("@submit").should("have.been.calledWith", { test: undefined });
  });

  it("should submit values ", () => {
    render();
    cy.get("button[role=combobox]").click();
    cy.get("ul[role=listbox] > li").each((i, index) => {
      cy.wrap(i).click().should("have.attr", "aria-selected", "true");
      cy.get("button  > ul ").contains(`title_${index}`);
    });
    cy.get("button[role=combobox]").click();

    cy.get("form").submit();

    cy.get("@submit").should("have.been.calledWith", {
      test: testItems.map((v) => v.value),
    });

    cy.get("button[role=combobox]").click();
    cy.get("ul[role=listbox] > li:nth-child(2)")
      .click()
      .should("have.attr", "aria-selected", "false");

    cy.get("form").submit();

    cy.get("@submit").should("have.been.calledWith", {
      test: testItems.filter((i) => i.title !== "title_1").map((v) => v.value),
    });
  });

  it("should handle initial values", () => {
    render({ values: { test: ["value_1", "value_3"] } });
    cy.get("button[role=combobox]").contains("title_1");
    cy.get("button[role=combobox]").contains("title_3");

    cy.get("form").submit();
    cy.get("@submit").should("have.been.calledWith", {
      test: ["value_1", "value_3"],
    });
    cy.get("button[role=combobox]").click();
    cy.get("ul[role=listbox] > li:nth-child(2)").click();
    cy.get("form").submit();
    cy.get("@submit").should("have.been.calledWith", {
      test: ["value_3"],
    });
  });
});
