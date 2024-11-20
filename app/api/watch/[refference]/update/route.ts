import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{
  refference: string;
}>;

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const body = await request.json();
    const { refference } = await params;

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
