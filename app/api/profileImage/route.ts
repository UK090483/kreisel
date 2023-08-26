import { NextResponse, NextRequest } from "next/server";
import { previewClient } from "@services/SanityService/sanity.server";
import { SanityClient } from "sanity";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// eslint-disable-next-line import/no-unused-modules
export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user.email) {
    return NextResponse.json({ ok: true, status: 401 });
  }

  const formData = await req.formData();
  const erased = (await formData.get("erased")) === "true";

  if (erased) {
  }

  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const imageResult = await uploadImageBlob(file, previewClient);

  await updateUser(previewClient, session.user.email, {
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
