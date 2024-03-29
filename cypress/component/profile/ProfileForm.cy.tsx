/* eslint-disable no-unused-expressions */
import ProfileForm from "../../../lib/Profile/ProfileForm";
import {
  memberFields,
  profileFields,
  degreeOptions,
  focusOptions,
  membershipOptions,
} from "../../../lib/Profile/Fields";

import React, { ComponentProps } from "react";

const allFields = [
  ...memberFields,
  ...profileFields,
  { name: "wantsPublicProfile" },
].filter((i) => !["email", "image"].includes(i.name));
const _profileFields = [...profileFields].filter(
  (i) => !["email", "image"].includes(i.name)
);

const testData = {
  title: "testTitle",
  city: "testCity",
  practice: "testPractice",
  focusOther: "testFocusOther",
  qualification: "testQualification",
  description: "testDescription",
  firstName: "testFirstName",
  jobDescription: "testJobDescription",
  offersInternship: true,
  wantsPublicProfile: true,
  mobile: "+45 53856002",
  experience: "testExperience",
  name: "testName",
  phone: "+45 53856002",
  street: "testStreet",
  website: "https://github.com/",
  zipCode: "1700",
  education: "testEducation",
  additionalDegree: "testAdditionalDegree",
  degree: [degreeOptions[0].value],
  focus: [focusOptions[0].value],
  membership: [membershipOptions[0].value],
};

const render = (overwrite?: Partial<ComponentProps<typeof ProfileForm>>) => {
  const props = { profile: {}, ...overwrite };
  return cy.mount(<ProfileForm {...props} />);
};

const fillField = (field: (typeof memberFields)[0], testValue) => {
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
};

describe("<ProfileForm />", () => {
  it("has no unused Inputs", () => {
    render({
      allowProfile: true,
      profile: { name: "bla", firstName: "blu" },
    });
    cy.get('[data-test-id^="input"]').each((i) => {
      const testid = i.data("testId");
      const found = allFields.find(
        //@ts-ignore
        (field) => testid === `input_${field.name}`
      );
      expect(found, `unused input ${testid}`).not.to.be.undefined;
    });
  });

  it("show announcement if name and firstName missing", () => {
    render();
    cy.get(`#announcement`);
  });

  it("hide announcement if name and firstName ", () => {
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

  _profileFields.forEach((i) => {
    it(`Field ${i.title} should handle input`, () => {
      render({
        allowProfile: true,
        profile: { name: "bla", firstName: "blu", wantsPublicProfile: true },
      });
      //@ts-ignore
      const testValue = testData[i.name];

      fillField(i, testValue);

      cy.intercept("POST", "**/profile", {
        body: [{ projectId: "1" }, { projectId: "2" }],
      }).as("profile");

      cy.get('button[type="submit"]').should("be.visible").click();
      cy.wait("@profile")
        .its("request")
        .then((request) => {
          //@ts-ignore

          cy.log();
          const formData = request.body;

          if (["array"].includes(i.type)) {
            // cy.wrap(formData, { timeout: 0 })
            //   .should("have.property", i.name)
            //   .should("deep.equal", testValue);
          } else if (i.type === "boolean") {
            cy.wrap(formData, { timeout: 0 })
              .should("have.property", i.name)
              .should("equal", testValue);
          } else {
            cy.wrap(formData, { timeout: 0 })
              .should("have.property", i.name)
              .should("equal", testValue);
          }
        });
    });
  });

  it("should handle Server Error", () => {
    cy.intercept("POST", "**/profile", {
      forceNetworkError: true,
    }).as("profile");

    render({
      allowProfile: true,
      profile: { name: "bla", firstName: "blu", wantsPublicProfile: true },
    });

    fillField(profileFields[6], testData[profileFields[6].name]);
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get("#errorMessage").should("be.visible");
  });
});
