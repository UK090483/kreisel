import {
  User,
  sessionOptions,
  getUserByEmail,
} from "@lib/Auth/IronSession/IronSession";
import { unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(magicLoginRoute, sessionOptions);

async function magicLoginRoute(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const seal = typeof req.query.seal === "string" && req.query.seal;

  if (!seal) {
    throw new Error("seal value not defined");
  }

  const { email } = await unsealData<{ email?: string }>(seal, {
    password: sessionOptions.password,
  });

  if (!email) {
    throw new Error("could not find unsealed user");
  }

  const user = await getUserByEmail({ email });

  req.session.user = user;

  await req.session.save();

  res.redirect(`/`);
}
