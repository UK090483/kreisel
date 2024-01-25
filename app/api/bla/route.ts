/* eslint-disable import/no-unused-modules */

import { getUser } from "@lib/Auth/IronSession/IronSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await getUser(req, res);

  return NextResponse.json({ res, user });
}
