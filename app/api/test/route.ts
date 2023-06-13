import { NextResponse } from "next/server";

let res: any;
export async function GET() {
  // res = await prisma?.page.createMany({
  //   data: [
  //     { name: "a" },
  //     { name: "b" },
  //     { name: "b" },
  //     { name: "c" },
  //     { name: "d" },
  //     { name: "e" },
  //     { name: "f" },
  //   ],
  // });
  return NextResponse.json({ res });
}
