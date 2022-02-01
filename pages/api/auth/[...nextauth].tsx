import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { mockClient } from "@services/SanityService/test/testClient";

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
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
  session: { strategy: "jwt", maxAge: 60000 },
  jwt: {
    // A secret to use for key generation. Defaults to the top-level `secret`.
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60000,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behavior.
  },

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
