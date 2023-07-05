import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  refference: string;
}

export async function GET(request: NextRequest, { params }: { params: IParams }) {
  try {

    if (!params.refference) {
      return new NextResponse("INVALID_WATCH_REFFERENCE", { status: 404 });
    }

    let watch;
    try {
      watch = await prisma.watch.findFirst({
        where: {
          ref: params.refference
        }
      });
    } catch (error: any) {
      console.error(error)
      return NextResponse.error()
    }

    if (watch?.recognizable === true) return new NextResponse("Watch Already Recognizable");

    const res = await prisma.watch.update({
      data: {
        recognizable: true
      },
      where: {
        ref: params.refference
      }
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("WATCH_ERROR_UPDATE_RECOGNIZABLE", { status: 400 });
  }
}