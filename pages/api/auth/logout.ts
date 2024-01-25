import { sessionOptions, User } from "@lib/Auth/IronSession/IronSession";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

// eslint-disable-next-line import/no-unused-modules
export default withIronSessionApiRoute(logoutRoute, sessionOptions);
