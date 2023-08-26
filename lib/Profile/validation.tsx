import { membershipOptions, degreeOptions, focusOptions } from "./Fields";
import { object, string, array, InferType, boolean } from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
const MAX_FILE_SIZE = 100_000_0;

export const memberSchema = object({
  title: string(),
  firstName: string().required().default(""),
  name: string().required().default(""),
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

  // image: object({
  //   url: string().nullable(),
  //   file: mixed<File>()
  //     .test("size", "Only Images up to 1MB are permitted", (file) =>
  //       file ? file.size <= MAX_FILE_SIZE : true
  //     )
  //     .nullable(),

  //   erased: boolean().nullable(),
  // })
  //   .nullable()
  //   .default(undefined),
  offersInternship: boolean(),
});

export const schema = memberSchema.concat(profileFields);

export type Profile = InferType<typeof schema>;
type Member = InferType<typeof memberSchema>;
