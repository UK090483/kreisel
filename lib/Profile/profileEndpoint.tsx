import { schema } from "./validation";
import { SanityClient, SanityImageAssetDocument } from "@sanity/client";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const getHandler = (client: SanityClient, getTokenFn: typeof getToken) => {
  return async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    let imageDocument: SanityImageAssetDocument | null = null;
    // Check Token
    const token = await getTokenFn({ req, secret: process.env.AUTH_SECRET });
    if (!token || !token?.email) {
      return res.status(401).send("unauthorized");
    }

    const { data, image } = await parseFormdata(req);

    if (!data) {
      return res.status(400).send("no data to process");
    }
    if (!image && !data) {
      return res.status(400).send("no data to process");
    }

    const member = await client.fetch<
      | {
          _id: string;
          allowProfile?: boolean;
        }[]
      | null
    >(
      `*[_type == 'member' && email.current == '${token?.email}' ][]{_id,allowProfile}`
    );

    if (!member) {
      return res.status(401).send("unauthorized");
    }

    if (image) {
      imageDocument = await uploadImageBlob(image, client);
    }

    let validatedValues: any = null;

    try {
      validatedValues = await schema.validate(data, { stripUnknown: true });
    } catch (error) {
      return res.status(400).json(error);
    }

    if (imageDocument) {
      validatedValues.image = {
        _type: "reference",
        asset: { _ref: imageDocument._id, _type: "reference" },
      };
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
    `*[_type == 'member' && email.current == '${email}' ][]`
  );

  const _data = { ...data, approved: false };

  if (items.length < 1) {
    return null;
  }
  const original = items.find((i) => !i._id.startsWith("drafts"));
  const draft = items.find((i) => i._id.startsWith("drafts"));

  if (draft) {
    return await client
      .patch(draft._id)
      .set(_data)
      .commit({ returnDocuments: true });
  }

  if (original) {
    return await client.create({
      ...original,
      ..._data,
      _id: "drafts." + original._id,
    });
  }
};

const parseFormdata = async (req: NextApiRequest) => {
  const form = formidable({ multiples: true });
  return new Promise<{ data: null | {}; image: Buffer | null }>(
    (resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        let image: Buffer | null = null;
        const data =
          typeof fields?.data === "string" ? JSON.parse(fields.data) : null;

        if (files && files.image && !Array.isArray(files.image)) {
          image = fs.readFileSync(files.image.filepath);
        }
        resolve({ data, image });
      });
    }
  );
};

async function uploadImageBlob(blob: File | Buffer, client: SanityClient) {
  return await client.assets.upload("image", blob, {
    contentType: "image/png",
    filename: "someText.png",
  });
}
