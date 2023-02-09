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

  res.status(200).json({ user });
}
