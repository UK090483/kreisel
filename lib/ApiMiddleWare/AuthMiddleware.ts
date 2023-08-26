import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export type AuthData = {
  authToken?: { email: string };
};

type NextApiRequestWithAuth = NextApiRequest & AuthData;

const authMiddleware: Middleware<
  NextApiRequestWithAuth,
  NextApiResponse
> = async (req, res, next) => {
  const supabase = createPagesServerClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user.email) {
    return res.status(401).send("unauthorized");
  }
  req.authToken = { email: session.user.email };
  await next();
};

export default authMiddleware;
