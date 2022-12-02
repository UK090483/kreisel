import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { mockClient } from "@services/SanityService/test/testClient";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  adapter: SanityAdapter({
    client: mockClient({
      database: [
        { _type: "user", email: "web@konradullrich.com", _id: "testUser1" },
        {
          _type: "user",
          name: "Konrad",
          email: "konradullrich@me.com",
          _id: "testUser2",
        },
        {
          _type: "user",
          email: "meikeschueler@kreiselhh.de",
          _id: "testUser3",
        },
        { _type: "user", email: "gesaharms@kreiselhh.de", _id: "testUser4" },
      ],
    }),
    devMode: true,
  }),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 600 },
  jwt: {
    maxAge: 600,
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
};
export default NextAuth(authOptions);
