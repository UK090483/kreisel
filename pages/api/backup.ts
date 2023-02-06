// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  await s3.listBuckets((b, data) => {
    console.log(data);
  });

  res.status(200).json({ name: "John Doe" });
}
