import { membershipOptions, degreeOptions, focusOptions } from "./Fields";
import { object, string, array, InferType, boolean } from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

const getMax = (field: string, number: number) =>
  `${field} darf die Anzahl von ${number} Zeichen nicht überschreiten`;

export const memberSchema = object({
  title: string().max(12, getMax("der Titel", 12)),
  firstName: string().required().default("").max(30, getMax("der Vorname", 24)),
  name: string().required().default("").max(30, getMax("der Name", 24)),
});

const profileFields = object({
  practice: string().max(30, getMax("der Name der Praxis", 30)),
  street: string().max(30, getMax("die Strasse", 50)),
  zipCode: string()
    .matches(/^\d+$/, {
      message: "es sind nur Nummern zugelassen",
      excludeEmptyString: true,
    })
    .max(10, getMax("die PLZ", 10)),
  city: string().max(30, getMax("der Ort", 50)),
  phone: string().matches(phoneRegExp, {
    message: "Dies ist keine valide Telefonnummer",
    excludeEmptyString: true,
  }),
  mobile: string().matches(phoneRegExp, {
    message: "Dies ist keine valide Telefonnummer",
    excludeEmptyString: true,
  }),
  website: string().url(
    "Dies ist keine valide Web Adresse, sie sollte so aussehen: https://deinepage.de "
  ),
  description: string().max(600, getMax("die Beschreibung", 600)),

  //Arbeitsschwerpunkte
  focus: array().of(string().oneOf(focusOptions.map((i) => i.value))),
  focusOther: string().max(300, getMax("Sonstige Arbeitsschwerpunkte", 300)),
  //Abschlüsse
  degree: array().of(string().oneOf(degreeOptions.map((i) => i.value))),

  //Mitgliedschaften
  membership: array().of(string().oneOf(membershipOptions.map((i) => i.value))),

  //Grundqualifikation
  qualification: string().max(300, getMax("die Grundqualifikation", 300)),

  offersInternship: boolean(),
});

export const schema = memberSchema.concat(profileFields);

export type Profile = InferType<typeof schema>;
type Member = InferType<typeof memberSchema>;
