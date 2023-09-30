import { previewClient } from "@services/SanityService/sanity.server";
import { IronSessionOptions } from "iron-session";
const memberType = "member";

export type User = {
  isLoggedIn: boolean;
  email?: string;
  member?: boolean;
  profile?: boolean;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.AUTH_SECRET,
  cookieName: "session/kreisel",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getUserByEmail = async ({ email }: { email: string }) => {
  return await previewClient.fetch<User>(
    `*[_type == '${memberType}' && email.current == $email ][0]{...,'member':allowMember,'profile':allowProfile, 'email':email.current}`,
    { email }
  );
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

export const authRoutes = {
  api: {
    login: "api/auth/login",
    logout: "api/auth/logout",
  },
  pages: {
    signIn: "auth/login",
  },
};

export const baseUrl =
  process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
