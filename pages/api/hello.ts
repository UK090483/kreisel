import { supabase } from "@lib/supabase/adminClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: any;
};

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data: user, error } = await supabase.auth.admin.updateUserById(
    "0494dc3d-6e67-4ef9-b302-bc0b00a2a8da",
    { user_metadata: { member: !!req.query.member } }
  );
  res.json({ user });
}
