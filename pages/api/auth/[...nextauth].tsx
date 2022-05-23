import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { mockClient } from "@services/SanityService/test/testClient";
import { previewClient } from "@services/SanityService/sanity.server";

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async signIn(params) {
      const { user, account, profile, email, credentials } = params;
      //console.log(params);

      const isAllowedToSignIn = !!user.allowMember;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, isNewUser, user, profile }) {
      // console.log({
      //   n: "jwtCallback",
      //   user,
      //   token,
      //   profile,
      //   isNewUser,
      //   account,
      // });

      if (user) {
        token.allowMember = !!user.allowMember;
        token.allowProfile = !!user.allowProfile;
      }

      return token;
    },
    async session({ session, token, user }) {
      // console.log({ n: "sessionCallback", user, token, session });

      session.allowMember = token.allowMember;
      session.allowProfile = token.allowProfile;
      return session;
    },
  },

  adapter: SanityAdapter({
    client: previewClient,
    docType: "therapist",
    devMode: true,
  }),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 6000 },
  jwt: {
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
    maxAge: 6000,
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
});
