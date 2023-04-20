import SanityAdapter from "@lib/Auth/SanityAdapter/SanityAdapter";
import { previewClient } from "@services/SanityService/sanity.server";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
// import { mockClient } from "@services/SanityService/test/testClient";
const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
    newUser: "/profile",
  },
  adapter: SanityAdapter({
    client: previewClient,
    devMode: true,
  }),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      // console.count("jwt---------");

      // console.log({ token, account, profile });

      // console.log("jwt---------");
      // Persist the OAuth access_token and or the user id to the token right after signin

      const fetchRoles = await previewClient.fetch<{
        allowMember?: boolean | null;
        allowProfile?: boolean | null;
      } | null>(
        `*[_type == "member" && email.current == "${token.email}" ][0]{ allowMember,allowProfile }`
      );

      // console.log(fetchRoles);

      return { ...token, ...fetchRoles };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.

      // console.count("session---------");

      // console.log({ session, token, user });
      // console.log("session---------");
      // //@ts-ignore
      // session.member = token.member;
      return {
        ...session,
        member: token.allowMember,
        profile: token.allowProfile,
      };
    },
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signIn---------");
      // console.log({ user, account, profile, email, credentials });
      // console.log("signIn---------");
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
      // eslint-disable-next-line no-console
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
// eslint-disable-next-line import/no-unused-modules
export default NextAuth(authOptions);
