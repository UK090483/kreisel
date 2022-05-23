export default {
  name: "verificationToken",
  title: "Therapeut",
  type: "document",
  fields: [
    {
      name: "identifier",
      title: "identifier",
      type: "string",
    },
    {
      name: "token",
      title: "Token",
      type: "string",
    },
    {
      name: "expires",
      title: "expires",
      type: "datetime",
    },
  ],
};
