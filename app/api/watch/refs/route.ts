import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const refList = await prisma.watch.findMany({
      select: {
        ref: true,
      },
    });

    return NextResponse.json(refList, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return new NextResponse("GET_REFS_ERROR", { status: 400 });
  }
}
