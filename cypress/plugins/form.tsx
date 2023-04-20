export const fillField = (
  field: {
    [k: string]: any;
    name: string;
    type: "string" | "text" | "array" | "boolean" | "image";
  },
  testValue
) => {
  if (field.type === "string" || field.type === "text") {
    cy.get(`#${field.name}`).type(testValue, {
      delay: 0,
      waitForAnimations: false,
      timeout: 0,
    });
  }
  if (field.type === "array") {
    cy.get(`#${field.name}`).click().get("li").first().click();
  }

  if (field.type === "boolean") {
    cy.get(`#${field.name}`).click();
  }

  if (field.type === "image") {
    cy.get(`input[type=file]`).selectFile("cypress/fixtures/image.png", {
      force: true,
    });
  }
};
