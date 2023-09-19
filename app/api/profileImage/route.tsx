import { previewClient } from "@services/SanityService/sanity.server";
import { NextResponse, NextRequest } from "next/server";
import { SanityClient } from "sanity";
import { getToken } from "next-auth/jwt";
// eslint-disable-next-line import/no-unused-modules
export const POST = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || typeof token === "string" || !token.email) {
    return NextResponse.json({ ok: true, status: 401 });
  }
  if (!token || !token.email) {
    return NextResponse.json({ ok: true, status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const imageResult = await uploadImageBlob(file, previewClient);

  await updateUser(previewClient, token.email, {
    image: {
      _type: "reference",
      asset: { _ref: imageResult._id, _type: "reference" },
    },
  });
  return NextResponse.json({ ok: true, status: 200 });
};

async function uploadImageBlob(blob: File | Buffer, client: SanityClient) {
  return await client.assets.upload("image", blob);
}

const updateUser = async (client: SanityClient, email: string, data: any) => {
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
export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || typeof token === "string" || !token.email) {
    return NextResponse.json({ ok: true, status: 401 });
  }
  if (!token || !token.email) {
    return NextResponse.json({ ok: true, status: 401 });
  }

  await eraseImage(previewClient, token.email);

  return NextResponse.json({ ok: true, status: 200 });
};

const eraseImage = async (client: SanityClient, email: string) => {
  const items = await client.fetch<
    { _id: string; approved?: boolean; image?: { asset?: { _ref?: string } } }[]
  >(`*[_type == 'member' && email.current == '${email}' ][]`);

  if (items.length < 1) {
    return null;
  }
  const original = items.find((i) => !i._id.startsWith("drafts"));
  const draft = items.find((i) => i._id.startsWith("drafts"));

  if (draft && draft?.image?.asset?._ref) {
    await client.patch(draft._id).unset(["image"]).commit();
    await client.delete(draft.image.asset._ref);
  }

  if (!draft && original?.image?.asset?._ref) {
    await client.patch(original._id).unset(["image"]).commit();
    await client.delete(original.image.asset._ref);
  }
};
