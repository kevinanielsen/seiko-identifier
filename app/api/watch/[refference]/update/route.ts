import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  refference: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const body = await request.json();
    const { refference } = params;

    if (!body) {
      return NextResponse.json("INVALID_BODY_WATCH_UPDATE", { status: 400 });
    }

    const res = await prisma.watch.update({
      where: {
        ref: refference,
      },
      data: body,
    });

    return NextResponse.json(res);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.error();
  }
}
