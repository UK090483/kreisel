/* eslint-disable no-unused-expressions */
///<reference path="../../support/component.tsx" />

import { memberFields, profileFields } from "../../../lib/Profile/Fields";
import { schema } from "../../../lib/Profile/validation";

const allFieldsWithoutEmail = [...memberFields, ...profileFields].filter(
  (i) => i.name !== "email"
);

describe("Should have a validation for all fields", () => {
  allFieldsWithoutEmail.forEach((field) => {
    it(`have validation for field ${field.name}`, () => {
      const validation = schema.describe().fields[field.name];
      expect(validation).to.not.be.undefined;
    });
  });
});

describe("Should have no unused validations", () => {
  Object.entries(schema.describe().fields).forEach((validation) => {
    it(`have field for validation ${validation[0]}`, () => {
      const found = allFieldsWithoutEmail.find((i) => i.name === validation[0]);
      expect(found).to.not.be.undefined;
    });
  });
});
