import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { mockClient } from "@services/SanityService/test/testClient";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  adapter: SanityAdapter({
    client: mockClient({
      database: [
        {
          _type: "user",
          name: "Konrad",
          email: "konradullrich@me.com",
          test: "test",
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
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("jwt---------");
      console.log({ token, account, profile });

      console.log("jwt---------");
      // Persist the OAuth access_token and or the user id to the token right after signin
      token.test = "bla test";
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("session---------");
      console.log({ session, token, user });
      console.log("session---------");
      //@ts-ignore
      session.sess = token.test;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn---------");
      console.log({ user, account, profile, email, credentials });
      console.log("signIn---------");
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },

  events: {
    createUser: (...props) => {
      console.log("createUser", ...props);
    },
  },

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
