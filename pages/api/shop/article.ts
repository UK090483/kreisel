// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from "@services/SanityService/sanity.server";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [k: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body && JSON.parse(req.body);
  if (!body?.article) {
    throw new Error("missing article data");
  }
  const data = await sanityClient.fetch<{ _id: string }[] | null>(
    `*[_type=='article' && _id in $ids ]{...}`,
    { ids: body.article }
  );

  const prepared = data
    ? data.reduce((acc, item) => {
        const nextAcc = { ...acc };
        nextAcc[item._id] = item;
        return nextAcc;
      }, {} as { [k: string]: any })
    : {};

  res.status(200).json(prepared);
}
