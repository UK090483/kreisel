import {
  getUserByEmail,
  sessionOptions,
  User,
} from "@lib/Auth/IronSession/IronSession";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user && req.session.user.email) {
    console.log("fetch user");
    const email = req.session.user.email;
    const user = await getUserByEmail({ email });

    res.json({
      ...user,
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
