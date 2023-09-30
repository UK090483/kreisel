import { sessionOptions, User } from "@lib/Auth/IronSession/IronSession";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}

// eslint-disable-next-line import/no-unused-modules
export default withIronSessionApiRoute(userRoute, sessionOptions);
