import { string } from "yup";
const emailSchema = string().email();

export const membershipOptions = [
  { title: "KREISELnetzwerk", value: "KREISELnetzwerk" },
  { title: "FIL", value: "FIL" },
  { title: "BVL", value: "BVL" },
  { title: "LegaKids", value: "LegaKids" },
];

export const degreeOptions = [
  { title: "KREISELzertifikat", value: "KREISELzertifikat" },
  { title: "KREISELurkunde", value: "KREISELurkunde" },
  { title: "KREISELgrundlagen", value: "KREISELgrundlagen" },
  { title: "Dreijährige Ausbildung", value: "DreijährigeAusbildung" },
  { title: "Zweijährige Ausbildung", value: "ZweijährigeAusbildung" },
  {
    title: "Integrative Lerntherapeutin / Integrativer Lerntherapeut FiL",
    value: "IL/ILFil",
  },
  { title: "Dyslexietherapeut® nach BVL", value: "Dyslexietherapeut" },
  { title: "Dyskalkulietherapeut", value: "Dyskalkulietherapeut" },
];

const memberFields = [
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

export const profileFields = [
  {
    name: "jobDescription",
    title: "Beruf",
    type: "text",
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
    name: "education",
    title: "Ausbildung",
    type: "string",
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
    name: "degree",
    title: "Abschlüsse",
    type: "array",
    of: [{ type: "string" }],
    options: {
      list: degreeOptions,
    },
  },
  {
    name: "image",
    title: "Image",
    type: "defaultImage",
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
];

const fields = [...memberFields, ...profileFields, ...adminFields];

export default fields;
