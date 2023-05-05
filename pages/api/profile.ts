import {
  Formdata,
  FormdataFile,
  formdataMiddleware,
  validatedFormdataMiddleware,
} from "lib/ApiMiddleWare/FormdataMiddleware";

import { Profile, schema } from "@lib/Profile/validation";
import authMiddleware, { AuthData } from "@lib/ApiMiddleWare/AuthMiddleware";
import { previewClient } from "@services/SanityService/sanity.server";

import { use } from "next-api-middleware";

import { SanityClient } from "@sanity/client";
import { has, omit, pick } from "lodash";
import fs from "fs";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

//eslint-disable-next-line import/no-unused-modules
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const FileFields = ["image"];

async function handler(
  req: NextApiRequest & Formdata<Profile> & AuthData,
  res: NextApiResponse<any>
) {
  const email = req.authToken?.email;
  const data = omit(req.formData?.validated, FileFields);
  const fileFields = pick(req.formData?.validated, FileFields);

  if (!email) {
    return res.status(500).json({ message: "email missing" });
  }

  const { returnData, write, unset } = await handleFiles(fileFields);
  await updateUser(previewClient, email, { ...data, ...write }, unset);
  res.status(200).json({ ok: true, data: { ...data, ...returnData } });
}

const handleFiles = async (
  files: Record<string, any | { file: FormdataFile }>
) => {
  const returnData: Record<string, { url: string }> = {};
  const write: Record<
    string,
    { _type: "reference"; asset: { _ref: string; _type: "reference" } } | null
  > = {};

  let unset: string[] = [];

  for (const [key, val] of Object.entries(files)) {
    const file = "file" in val ? (val.file as FormdataFile) : undefined;
    if (file) {
      const created = await uploadImageBlob(
        fs.readFileSync(file.filepath),
        previewClient
      );
      returnData[key] = { url: created.url };
      write[key] = {
        _type: "reference",
        asset: { _ref: created._id, _type: "reference" },
      };
    }
    if (has(val, "erased")) {
      unset = [...unset, key];
    }
  }
  return { returnData, write, unset };
};

async function uploadImageBlob(blob: File | Buffer, client: SanityClient) {
  return await client.assets.upload("image", blob);
}

const updateUser = async (
  client: SanityClient,
  email: string,
  data: any,
  unset: string[] = []
) => {
  const items = await client.fetch<{ _id: string; approved?: boolean }[]>(
    `*[_type == 'member' && email.current == '${email}' ][]`
  );
  const _data = { ...data };
  if (items.length < 1) {
    return null;
  }
  const original = items.find((i) => !i._id.startsWith("drafts"));

  if (original) {
    client
      .transaction()
      .createOrReplace({ ...original, ..._data, _id: "drafts." + original._id })
      .patch(client.patch(original._id).set({ approved: false }))
      .commit();
  }
};

// eslint-disable-next-line import/no-unused-modules
export default use(
  authMiddleware,
  formdataMiddleware,
  validatedFormdataMiddleware(schema)
)(handler);
