import { getToken, JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";

export type AuthData = {
  authToken?: JWT;
};

type NextApiRequestWithAuth = NextApiRequest & AuthData;

const authMiddleware: Middleware<
  NextApiRequestWithAuth,
  NextApiResponse
> = async (req, res, next) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || typeof token === "string" || !token.email) {
    return res.status(401).send("unauthorized");
  }
  req.authToken = token;
  await next();
};

export default authMiddleware;
