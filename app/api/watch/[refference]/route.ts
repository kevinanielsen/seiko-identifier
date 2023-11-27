import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  refference: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const ref = params.refference;

  try {
    const watch = await prisma.watch.findFirst({
      where: {
        ref: ref,
      },
    });

    if (!watch) {
      return NextResponse.json("Invalid Refference", {
        status: 400,
        statusText: `Attempted refference lookup: ${ref}`,
      });
    }

    return NextResponse.json(watch);
  } catch (error: unknown) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
