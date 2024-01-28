import {
  User,
  sessionOptions,
  getUserByEmail,
  TTL_IN_MINUTES_MAGIC_LINK,
} from "@lib/Auth/IronSession/IronSession";
import { unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function magicLoginRoute(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const seal = typeof req.query.seal === "string" && req.query.seal;

  if (!seal) {
    throw new Error("seal value not defined");
  }

  const { email, created_at } = await unsealData<{
    email?: string;
    created_at: number;
  }>(seal, {
    password: sessionOptions.password,
  });

  const now = new Date().getTime();
  const diff = (now - created_at) / 60000;
  if (diff > TTL_IN_MINUTES_MAGIC_LINK) {
    res.redirect(`/auth/error?error=verification`);
    return;
  }

  if (!email) {
    res.redirect(`/auth/error?error=verification`);
    return;
  }

  const user = await getUserByEmail({ email });

  req.session.user = user;

  await req.session.save();

  res.redirect(`/`);
}

export default withIronSessionApiRoute(magicLoginRoute, sessionOptions);
