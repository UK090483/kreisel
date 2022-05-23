// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { previewClient } from "@services/SanityService/sanity.server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const email = "konradullrich@me.com";

  const data = clearNullValues(JSON.parse(req.body));

  const patchResult = await previewClient
    .patch({
      query: `*[_type == 'therapist' && email == '${email}' && allowProfile == true ][0]`,
    })
    .set(data)
    .commit();

  res.status(200).json({ name: "John Doe", patchResult });
}

const clearNullValues = (data: { [k: string]: any }) => {
  return Object.fromEntries(
    Object.entries(data).filter((item) =>
      typeof item[1] === "string" ? true : item[1]
    )
  );
};
