import { string } from "yup";
const emailSchema = string().email();

export const focusOptions = [
  { title: "Dyslexie", value: "dyslexie" },
  { title: "Dyskalkulie", value: "dyskalkulie" },
  { title: "Frühförderung", value: "frühförderung" },
  { title: "Jugendliche", value: "jugendliche" },
  { title: "Erwachsene", value: "erwachsene" },
  { title: "LT in Schule", value: "lt-in-schule" },
  { title: "tiergestützt", value: "tiergestützt" },
];

export const degreeOptions = [
  {
    title: "KREISELzertifikat Dyskalkulie",
    value: "kreiselzertifikat-dyskalkulie",
  },
  { title: "KREISELzertifikat Dyslexie", value: "kreiselzertifikat-dyslexie" },
  { title: "KREISELurkunde Dyskalkulie", value: "kreiselurkunde-dyskalkulie" },
  { title: "KREISELurkunde Dyslexie", value: "kreiselurkunde-dyslexie" },
  { title: "KREISELgrundlagen", value: "kreisel-grundlagen" },
  { title: "Dyslexietherapeut*in® nach BVL", value: "dyslexietherapeut-bvl" },
  {
    title: "Dyskalkulietherapeut*in nach BVL",
    value: "dyskalkulietherapeut-bvl",
  },
  {
    title: "Integrative*r Lerntherapeut*in FiL Schwerpunkt Dyslexie",
    value: "integrative-lerntherapeut-dyslexie",
  },
  {
    title: "Integrative*r Lerntherapeut*in FiL Schwerpunkt Dyskalkulie",
    value: "integrative-lerntherapeut-dyskalkulie",
  },
];

export const membershipOptions = [
  { title: "KREISELnetzwerk", value: "kreisel-netzwerk" },
  { title: "FIL", value: "fil" },
  { title: "BVL", value: "bvl" },
  { title: "BLT", value: "blt" },
  { title: "LegaKids", value: "lega-kids" },
];

export const memberFields = [
  {
    name: "title",
    title: "Title",
    type: "string",
  },
  {
    name: "firstName",
    title: "Vorname",
    type: "string",
  },
  {
    name: "name",
    title: "Name",
    type: "string",
  },
  {
    name: "email",
    title: "Email",
    type: "slug",
    validation: (Rule: any) =>
      Rule.required()
        .custom(async (value: any) => {
          const isValid = await emailSchema.isValid(value?.current);
          return isValid ? true : "must be valid mail";
        })
        .error(),
  },
];

type MemberFields = {
  firstName: string;
  name: string;
  email: string;
};

async function myAsyncSlugifier() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 20) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const profileFields = [
  {
    name: "practice",
    title: "Praxis",
    type: "string",
  },
  {
    name: "street",
    title: "Strasse",
    type: "string",
  },
  {
    name: "zipCode",
    title: "PLZ",
    type: "string",
  },
  {
    name: "city",
    title: "Ort",
    type: "string",
  },
  {
    name: "phone",
    title: "Tel",
    type: "string",
  },
  {
    name: "mobile",
    title: "Mobil",
    type: "string",
  },

  {
    name: "website",
    title: "Website",
    type: "string",
  },
  {
    name: "description",
    title: "Beschreibung",
    type: "text",
  },
  {
    name: "focus",
    title: "Arbeitsschwerpunkte",
    type: "array",
    of: [{ type: "string" }],
    options: {
      list: focusOptions,
    },
  },
  {
    name: "focusOther",
    title: "Arbeitsschwerpunkte Sonstige",
    type: "text",
    description: "z.B. Konzentrationstraining, Fremdsprachen, …",
  },
  {
    name: "degree",
    title: "Abschlüsse",
    type: "array",
    of: [{ type: "string" }],
    options: {
      list: degreeOptions,
    },
    description:
      "Bitte wähle bei den KREISELabschlüssen nur deinen höchsten aus!",
  },
  {
    name: "membership",
    title: "Mitgliedschaft",
    type: "array",
    of: [{ type: "string" }],
    options: {
      list: membershipOptions,
    },
  },
  {
    name: "qualification",
    title: "Grundqualifikation",
    type: "text",
  },

  {
    name: "image",
    title: "Image",
    type: "image",
  },
  {
    name: "offersInternship",
    title: "Hospitationsplatz",
    type: "boolean",
  },
];

const adminFields = [
  {
    name: "allowMember",
    title: "Allow Member",
    type: "boolean",
  },
  {
    name: "allowProfile",
    title: "Allow Profile",
    type: "boolean",
  },
  {
    title: "Email Verified",
    type: "datetime",
    name: "emailVerified",
    readOnly: true,
  },
  {
    title: "Approved",
    name: "approved",
    type: "boolean",
    readOnly: true,
  },
  {
    name: "oneTimePassword",
    title: "One Time Password",
    type: "slug",
    options: {
      source: "name",
      slugify: myAsyncSlugifier,
    },
  },
  {
    title: "Show",
    name: "show",
    type: "boolean",
  },
  {
    hidden: true,
    title: "PW",
    name: "pw",
    type: "string",
    readOnly: true,
  },
];

const fields = [...memberFields, ...profileFields, ...adminFields];

export default fields;
