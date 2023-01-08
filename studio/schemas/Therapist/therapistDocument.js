import fields from "../../../lib/Profile/Fields";

export default {
  name: "therapist",
  title: "Mitglied",
  type: "document",
  fields,

  // fields: [
  //   {
  //     name: "firstName",
  //     title: "Vorname",
  //     type: "string",
  //   },
  //   {
  //     name: "name",
  //     title: "Name",
  //     type: "string",
  //   },
  //   {
  //     name: "slug",
  //     title: "Slug",
  //     type: "slug",
  //   },
  //   {
  //     name: "jobDescription",
  //     title: "Beruf",
  //     type: "text",
  //   },
  //   {
  //     name: "street",
  //     title: "Stasse",
  //     type: "string",
  //   },
  //   {
  //     name: "zipCode",
  //     title: "PLZ",
  //     type: "string",
  //   },
  //   {
  //     name: "city",
  //     title: "Ort",
  //     type: "string",
  //   },
  //   {
  //     name: "phone",
  //     title: "Telefonnummer",
  //     type: "string",
  //   },
  //   {
  //     name: "mobile",
  //     title: "Mobil",
  //     type: "string",
  //   },
  //   {
  //     name: "email",
  //     title: "Email",
  //     type: "string",
  //   },
  //   {
  //     name: "website",
  //     title: "Website",
  //     type: "string",
  //   },
  //   {
  //     name: "description",
  //     title: "Beschreibung",
  //     type: "array",
  //     of: [{ type: "block" }],
  //   },
  //   {
  //     name: "education",
  //     title: "Ausbildung",
  //     type: "string",
  //   },
  //   {
  //     name: "degrees",
  //     title: "Abschlüsse",
  //     type: "string",
  //   },
  //   {
  //     name: "membership",
  //     title: "Abschlüsse",
  //     type: "array",
  //     of: [{ type: "string" }],
  //     options: {
  //       list: [
  //         { title: "KREISELnetzwerk", value: "KREISELnetzwerk" },
  //         { title: "FIL", value: "FIL" },
  //         { title: "BVL", value: "BVL" },
  //         { title: "LegaKids", value: "LegaKids" },
  //       ],
  //     },
  //   },
  //   {
  //     name: "degree",
  //     title: "Abschlüsse",
  //     type: "array",
  //     of: [{ type: "string" }],
  //     options: {
  //       list: [
  //         { title: "KREISELzertifikat", value: "KREISELzertifikat" },
  //         { title: "KREISELurkunde", value: "KREISELurkunde" },
  //         { title: "KREISELgrundlagen", value: "KREISELgrundlagen" },
  //         { title: "Dreijährige Ausbildung", value: "DreijährigeAusbildung" },
  //         { title: "Zweijährige Ausbildung", value: "ZweijährigeAusbildung" },
  //         {
  //           title:
  //             "Integrative Lerntherapeutin / Integrativer Lerntherapeut FiL",
  //           value: "IL/ILFil",
  //         },
  //         { title: "Dyslexietherapeut® nach BVL", value: "Dyslexietherapeut" },
  //         { title: "Dyskalkulietherapeut", value: "Dyskalkulietherapeut" },
  //       ],
  //     },
  //   },
  //   {
  //     name: "image",
  //     title: "Image",
  //     type: "defaultImage",
  //   },
  //   {
  //     name: "allowMember",
  //     title: "Allow Member",
  //     type: "boolean",
  //   },
  //   {
  //     name: "allowProfile",
  //     title: "Allow Profile",
  //     type: "boolean",
  //   },
  // ],
  preview: {
    select: {
      title: "name",
      subtitle: "firstName",
      media: "image",
    },
  },
};
