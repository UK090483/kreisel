/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
const showProfile = (doc) => doc?.parent?.allowProfile !== true;

export default {
  name: "therapist",
  title: "Therapeut",
  type: "document",
  fields: [
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
      type: "string",
    },
    {
      name: "emailVerified",
      title: "Email Verified",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "image",
      title: "Image",
      type: "defaultImage",
      hidden: showProfile,
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      hidden: showProfile,
    },
    {
      name: "jobDescription",
      title: "Beruf",
      type: "text",
      hidden: showProfile,
    },
    {
      name: "street",
      title: "Stasse",
      type: "string",
      hidden: showProfile,
    },
    {
      name: "zipCode",
      title: "PLZ",
      type: "string",
      hidden: showProfile,
    },
    {
      name: "city",
      title: "Ort",
      type: "string",
      hidden: showProfile,
    },
    {
      name: "phone",
      title: "Telefonnummer",
      type: "string",
      hidden: showProfile,
    },

    {
      name: "website",
      title: "Website",
      type: "string",
      hidden: showProfile,
    },
    {
      name: "description",
      title: "Beschreibung",
      type: "array",
      of: [{ type: "block" }],
      hidden: showProfile,
    },
    {
      name: "education",
      title: "Ausbildung",
      type: "string",
      hidden: showProfile,
    },
    {
      name: "degrees",
      title: "Abschlüsse",
      type: "string",
      hidden: showProfile,
    },
  ],
  preview: {
    select: {
      name: "name",
      firstName: "firstName",
      imageUrl: "image.asset.url",
      media: "image",
      allowMember: "allowMember",
    },
    prepare({ name, firstName, imageUrl, allowMember }) {
      return {
        title: name,
        subtitle: firstName,

        media: imageUrl ? (
          <img
            src={imageUrl}
            style={{
              border: `${allowMember ? "green" : "red"} 2px solid`,
              objectFit: "cover",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <span style={{ fontSize: "1.5rem" }}>😀</span>
        ),
      };
    },
  },
};
