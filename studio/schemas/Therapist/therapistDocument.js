export default {
  name: "therapist",
  title: "Therapeut",
  type: "document",
  fields: [
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
      name: "slug",
      title: "Slug",
      type: "slug",
    },
    {
      name: "jobDescription",
      title: "Beruf",
      type: "text",
    },
    {
      name: "street",
      title: "Stasse",
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
      title: "Telefonnummer",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
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
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "education",
      title: "Ausbildung",
      type: "string",
    },
    {
      name: "degrees",
      title: "Abschlüsse",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "defaultImage",
    },
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "firstName",
      media: "image",
    },
  },
};
