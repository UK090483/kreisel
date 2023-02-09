import ProfileForm from "./ProfileForm";
import {
  memberFields,
  profileFields,
  degreeOptions,
  focusOptions,
  membershipOptions,
} from "./Fields";
import { mount, cy } from "testPrepare";
import React, { ComponentProps } from "react";

const testData = {
  title: "testTitle",
  city: "testCity",
  description: "testDescription",
  firstName: "testFirstName",
  jobDescription: "testJobDescription",
  offersInternship: true,
  mobile: "+45 53856002",
  experience: "testExperience",
  name: "testName",
  phone: "+45 53856002",
  street: "testStreet",
  website: "https://github.com/",
  zipCode: "testZipCode",
  education: "testEducation",
  additionalDegree: "testAdditionalDegree",
  degree: [degreeOptions[0].value],
  focus: [focusOptions[0].value],
  membership: [membershipOptions[0].value],
};

const render = (overwrite?: Partial<ComponentProps<typeof ProfileForm>>) => {
  const props = { profile: {}, ...overwrite };
  return mount(<ProfileForm {...props} />);
};

describe("<ProfileForm />", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it.only("show announcement if name and firstName missing", () => {
    render();
    cy.get(`#announcement`);
  });

  it.only("hide announcement if name and firstName ", () => {
    render({ profile: { name: "testName", firstName: "testFirstName" } });
    cy.get(`#announcement`).should("not.exist");
  });

  memberFields.forEach((i) => {
    if (i.name === "email") return;

    it(`render ${i.title} field`, () => {
      render();
      cy.get(`#${i.name}`);
    });
  });

  profileFields.forEach((i) => {
    if (i.name === "email") return;

    it(`Field ${i.title} should handle input`, () => {
      render({
        allowProfile: true,
        profile: { name: "bla", firstName: "blu" },
      });
      //@ts-ignore
      const testValue = testData[i.name];

      if (i.type === "string" || i.type === "text") {
        cy.get(`#${i.name}`).type(testValue);
      }
      if (i.type === "array") {
        cy.get(`#${i.name}`).click().get("li").first().click();
      }

      if (i.type === "boolean") {
        cy.get(`#${i.name}`).click();
      }

      if (i.type === "image") {
        cy.get(`input[type=file]`).selectFile("cypress/fixtures/image.png", {
          force: true,
        });
      }

      cy.intercept("POST", "**/profile", {
        body: [{ projectId: "1" }, { projectId: "2" }],
      }).as("profile");

      cy.get('input[type="submit"]').should("be.visible").click();
      cy.wait("@profile")
        .its("request.body")
        .then((body) => {
          if (i.type === "image") {
            cy.wrap(body, { timeout: 0 }).should("not.be.null").end();
          }
          if (i.type !== "image") {
            const matched = body.match(/{(.*?)\}/);
            const matchedStr = matched[0];
            const result = JSON.parse(matchedStr);
            cy.wrap(result, { timeout: 0 })
              .should("have.property", i.name)
              .should("deep.equal", testValue);
          }
        });
    });
  });
});
