import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  refference: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const body = await request.json();
    const { src, ref, collection, dialColor, recognizable } = body;

    if (!src || !ref || !collection)
      return NextResponse.json("MISSING_DATA_ERROR", { status: 404 });

    const res = await prisma.watch.create({
      data: {
        src: src,
        ref: params.refference,
        recognizable: recognizable ? recognizable : false,
        collection: collection,
        dialColor: dialColor && dialColor,
      },
    });

    return NextResponse.json(res);
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.error();
  }
}
