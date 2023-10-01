import { previewClient } from "@services/SanityService/sanity.server";
import { IronSessionOptions, getIronSession } from "iron-session";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
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

export const createNewUser = async ({
  email,
  name,
  firstName,
}: {
  email: string;
  name: string;
  firstName: string;
}) => {
  return previewClient.create({
    _id: `${memberType}.${uuid()}`,
    _type: memberType,
    email: { current: email, _type: "slug" },
    name,
    firstName,
  });
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

export const authRoutes = {
  api: {
    login: "api/auth/login",
    signup: "api/auth/signup",
    logout: "api/auth/logout",
  },
  pages: {
    signIn: "auth/login",
    error: "auth/error",
    profile: "profile",
    checkMail: "auth/checkMail",
  },
};

export const baseUrl =
  process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;

export const getUser = async (req: NextRequest, res: NextResponse) => {
  const session = await getIronSession(req, res, sessionOptions);
  if (session.user) {
    return session.user as User;
  }
  return;
};

export const authErrors = {
  linkExpired:
    "der Link ist leider abgelaufen, bitte versuchen sie es noch einmal",
};
