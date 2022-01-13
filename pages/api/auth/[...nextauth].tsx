import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { mockClient } from "@services/SanityService/test/testClient";

export default NextAuth({
  adapter: SanityAdapter({
    client: mockClient({
      database: [
        { _type: "user", email: "web@konradullrich.com", _id: "testUser" },
        { _type: "user", email: "konradullrich@me.com", _id: "testUser" },
        {
          _type: "user",
          email: "fv@schwan-communications.com",
          _id: "testUser",
        },
        {
          _type: "user",
          email: "nst@schwan-communications.com",
          _id: "testUser",
        },
      ],
    }),
    devMode: true,
  }),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },

  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
});
