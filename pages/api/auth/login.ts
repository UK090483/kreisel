import {
  sessionOptions,
  getUserByEmail,
} from "@lib/Auth/IronSession/IronSession";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email } = await req.body;
  try {
    if (typeof email !== "string")
      return res.status(500).json({ message: "email is needed" });

    const lowerCasedEmail = email.toLowerCase();
    const user = await getUserByEmail({ email: lowerCasedEmail });

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// eslint-disable-next-line import/no-unused-modules
export default withIronSessionApiRoute(loginRoute, sessionOptions);
