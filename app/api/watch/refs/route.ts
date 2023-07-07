import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const refList = await prisma.watch.findMany({
      select: {
        ref: true
      }
    })

    return NextResponse.json(refList, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("GET_REFS_ERROR", { status: 400 });
  }
}