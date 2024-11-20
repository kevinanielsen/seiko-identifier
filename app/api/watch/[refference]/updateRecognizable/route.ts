import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ refference: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { refference } = await params;
    if (!refference) {
      return new NextResponse("INVALID_WATCH_REFFERENCE", { status: 404 });
    }

    let watch;
    try {
      watch = await prisma.watch.findFirst({
        where: {
          ref: refference,
        },
      });
    } catch (error: unknown) {
      console.error(error);
      return NextResponse.error();
    }

    if (watch?.recognizable === true)
      return new NextResponse("Watch Already Recognizable");

    const res = await prisma.watch.update({
      data: {
        recognizable: true,
      },
      where: {
        ref: refference,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return new NextResponse("WATCH_ERROR_UPDATE_RECOGNIZABLE", { status: 400 });
  }
}
