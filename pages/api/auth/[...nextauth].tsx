import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { mockClient } from "@services/SanityService/test/testClient";
import { sanityClient } from "@services/SanityService/sanity.server";

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },

  adapter: SanityAdapter({
    client: sanityClient,
    docType: "therapist",
    // client: mockClient({
    //   database: [
    //     { _type: "user", email: "web@konradullrich.com", _id: "testUser1" },
    //     { _type: "user", email: "konradullrich@me.com", _id: "testUser2" },
    //     {
    //       _type: "user",
    //       email: "meikeschueler@kreiselhh.de",
    //       _id: "testUser3",
    //     },
    //     { _type: "user", email: "gesaharms@kreiselhh.de", _id: "testUser4" },
    //     {
    //       _type: "user",
    //       email: "fv@schwan-communications.com",
    //       _id: "testUser5",
    //     },
    //     {
    //       _type: "user",
    //       email: "nst@schwan-communications.com",
    //       _id: "testUser6",
    //     },
    //   ],
    // }),
    devMode: false,
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
