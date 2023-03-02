import { membershipOptions, degreeOptions, focusOptions } from "./Fields";
import { object, string, array, InferType, mixed, boolean } from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

export const memberSchema = object({
  title: string(),
  firstName: string().required(),
  name: string().required(),
});

const profileFields = object({
  practice: string(),
  street: string(),
  zipCode: string(),
  city: string(),
  phone: string().matches(phoneRegExp, {
    message: "Phone number is not valid",
    excludeEmptyString: true,
  }),
  mobile: string().matches(phoneRegExp, {
    message: "Phone number is not valid",
    excludeEmptyString: true,
  }),
  website: string().url(),
  description: string(),

  //Arbeitsschwerpunkte
  focus: array().of(string().oneOf(focusOptions.map((i) => i.value))),
  focusOther: string(),
  //Abschlüsse
  degree: array().of(string().oneOf(degreeOptions.map((i) => i.value))),

  //Mitgliedschaften
  membership: array().of(string().oneOf(membershipOptions.map((i) => i.value))),

  //Grundqualifikation
  qualification: string(),

  image: object({ url: string().nullable(), file: mixed() }).nullable(),
  offersInternship: boolean(),
});

export const schema = memberSchema.concat(profileFields);

export type Profile = InferType<typeof schema>;
