import {
  sessionOptions,
  getUserByEmail,
  eraseOneTimePassword,
} from "@lib/Auth/IronSession/IronSession";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import authRoutes from "@lib/Auth/authRoutes";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  if (!email || !password) {
    res.redirect(authRoutes.errors.unexpected);
    return;
  }

  const lowerCasedEmail = email.toLowerCase();

  try {
    const user = await getUserByEmail({ email: lowerCasedEmail, password });

    if (user) {
      await eraseOneTimePassword({ email: lowerCasedEmail });
      req.session.user = user;
      await req.session.save();
      res.status(200);
      return res.json(user);
    }
    res.status(404);
    res.json({});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// eslint-disable-next-line import/no-unused-modules
export default withIronSessionApiRoute(loginRoute, sessionOptions);
