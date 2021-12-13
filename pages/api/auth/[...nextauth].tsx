import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SanityAdapter from "@services/AuthService/SanityAdapter/SanityAdapter";
import { sanityClient } from "@services/SanityService/sanity.server";
import {mockClient} from '@services/SanityService/test/testClient'

export default NextAuth({
  adapter: SanityAdapter({ client: mockClient({database:[{email:'web@konradullrich.com',_id:'testUser'}]}), devMode: true }),
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
