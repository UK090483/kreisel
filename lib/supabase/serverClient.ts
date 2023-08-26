// Creating a new supabase server client object (e.g. in API route):
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

const supabaseServerClient = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  res.status(200).json({ user: user ?? "" });
};
// eslint-disable-next-line import/no-unused-modules
export default supabaseServerClient;
