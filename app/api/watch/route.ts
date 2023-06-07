import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { results } = body.data;

    results.forEach(async (result: any) => {
      const res = await prisma.watch.create({
        data: {
          ref: result.ref,
          src: result.img,
          collection: "5"
        }
      })

      console.log(res);
    })

    return new NextResponse(`${results.length} Watches Added!`, { status: 200 });
  } catch (error: any) {
    console.log(error, "WATCH_POST_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}