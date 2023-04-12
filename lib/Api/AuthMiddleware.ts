import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";

export type AuthData = {
  authData?: Awaited<ReturnType<typeof getToken>>;
};

export type NextApiRequestWithAuth = NextApiRequest & AuthData;

const authMiddleware: Middleware<
  NextApiRequestWithAuth,
  NextApiResponse
> = async (req, res, next) => {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token || !token?.email) {
      return res.status(401).send("unauthorized");
    }

    await next();
  } catch (err) {
    res.status(500);
    res.json({ error: err });
  }
};

export default authMiddleware;
