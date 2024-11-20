import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

type Params = Promise<{ refference: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { refference } = await params;

  try {
    const watch = await prisma.watch.findFirst({
      where: {
        ref: refference,
      },
    });

    if (!watch) {
      return NextResponse.json("Invalid Refference", {
        status: 400,
        statusText: `Attempted refference lookup: ${refference}`,
      });
    }

    return NextResponse.json(watch);
  } catch (error: unknown) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
