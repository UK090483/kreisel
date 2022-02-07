import { NextApiRequest, NextApiResponse } from "next";
import type { SanityClient } from "@sanity/client/sanityClient";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
  client: SanityClient
) {
  if (!req?.query?.secret) {
    return res.status(401).json({ message: "No secret token" });
  }
  const previewSecret = process.env.SANITY_PREVIEW_SECRET;

  if (!previewSecret) throw new Error("SANITY_PREVIEW_SECRET is not set");
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret token" });
  }

  if (!req.query.id) {
    return res.status(401).json({ message: "Id is Missing" });
  }

  const doc = await client.fetch(
    `*[ _id == "${req.query.id}" ][0]{ 'slug':select( defined(pageType) => pageType->slug.current +'/'+ slug.current , slug.current)}`
  );

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { location: doc.slug ? `/${doc.slug}` : "/" });

  return res.end();
}
