import { Profile } from "./profileQuery";
import { schema } from "./validation";
import { SanityClient } from "@sanity/client";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const getHandler = (client: SanityClient, getTokenFn: typeof getToken) => {
  return async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const token = await getTokenFn({ req, secret: process.env.AUTH_SECRET });

    if (!token || !token?.email) {
      return res.status(401).send("unauthorized");
    }
    const body = req.body ? (JSON.parse(req.body) as Profile) : null;

    if (!body) {
      return res.status(400).send("no data to process");
    }

    let validatedValues: any = null;

    try {
      validatedValues = await schema.validate(body, { stripUnknown: true });
    } catch (error) {
      return res.status(400).json(error);
    }

    const result = await updateUser(client, token.email, validatedValues);

    if (!result) {
      return res.status(400).json("unable to update User");
    }

    res.status(200).json({ result });
  };
};

export default getHandler;

const updateUser = async (client: SanityClient, email: string, data: any) => {
  const items = await client.fetch<{ _id: string }[]>(
    `*[_type == 'therapist' && email == '${email}' ][]`
  );

  if (items.length < 1) {
    return null;
  }
  const original = items.find((i) => !i._id.startsWith("drafts"));
  const draft = items.find((i) => i._id.startsWith("drafts"));

  if (draft) {
    return await client
      .patch(draft._id)
      .set(data)
      .commit({ returnDocuments: true });
  }

  if (original) {
    return await client.create({
      ...original,
      ...data,
      _id: "drafts." + original._id,
    });
  }
};
