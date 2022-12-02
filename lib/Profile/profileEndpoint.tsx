import { SanityClient } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "pages/api/auth/[...nextauth]";

type Data = {
  name: string;
};

const getHandler = (client: SanityClient) => {
  return async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const token = await getToken({ req, secret: authOptions.secret });

    if (!token) {
      return res.status(401).send("unauthorized");
    }
    const body = req.body ? JSON.parse(req.body) : null;

    if (!body) {
      return res.status(400).send("no data to process");
    }
    const result = await client
      .patch({
        query: `*[_type == 'therapist' && email == '${token.email}' ][]`,
      })
      .set({ city: body.city })
      .commit({ returnDocuments: true });
    console.log({ token, body });

    res.status(200).json({ result });
  };
};

export default getHandler;
