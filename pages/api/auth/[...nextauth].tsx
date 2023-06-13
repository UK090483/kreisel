import SanityAdapter from "@lib/Auth/SanityAdapter/SanityAdapter";
import { previewClient } from "@services/SanityService/sanity.server";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
    newUser: "/profile",
  },
  adapter: SanityAdapter({
    client: previewClient,
  }),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      const fetchRoles = await previewClient.fetch<{
        allowMember?: boolean | null;
        allowProfile?: boolean | null;
      } | null>(
        `*[_type == "member" && email.current == "${token.email}" ][0]{ allowMember,allowProfile }`
      );

      return { ...token, ...fetchRoles };
    },
    async session({ session, token }) {
      return {
        ...session,
        member: token.allowMember,
        profile: token.allowProfile,
      };
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
