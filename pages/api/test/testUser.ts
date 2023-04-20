import { previewClient } from "@services/SanityService/sanity.server";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: any;
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let user: any | null = null;

  if (req.method === "GET") {
    user = await previewClient.fetch(
      `*[_type == "member" && email.current match "test__kreisel__user@*" ]`
    );
  }

  if (req.method === "DELETE") {
    user = await previewClient.delete({
      query: `*[_type == "member" && email.current match "test__kreisel__user@*" ]`,
    });
  }

  if (req.method === "POST") {
    const { allowMember, allowProfile } = req.query;

    const next = {
      ...(allowMember ? { allowMember: allowMember === "true" } : {}),
      ...(allowProfile ? { allowProfile: allowProfile === "true" } : {}),
    };

    if (Object.keys(next).length > 0) {
      user = await previewClient
        .patch({
          query: `*[_type == "member" && email.current match "test__kreisel__user@*" ]`,
        })
        .set(next)
        .commit();
    }
  }

  res.status(200).json({ user });
}
