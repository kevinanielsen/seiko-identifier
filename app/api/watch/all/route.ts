import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const count = Number(request.nextUrl.searchParams.get("count"));
  const page = Number(request.nextUrl.searchParams.get("page"));
  const recognizable = request.nextUrl.searchParams.get("recognizable");

  try {
    if (recognizable === "true" && count && page) {
      const watchList = await prisma.watch.findMany({
        where: {
          recognizable: true,
        },
        take: count,
        skip: count * page - count,
      });

      return NextResponse.json(watchList);
    }

    if (count && page) {
      const watchList = await prisma.watch.findMany({
        take: count,
        skip: count * page - count,
      });

      return NextResponse.json(watchList);
    }

    if (recognizable === "true") {
      const watchList = await prisma.watch.findMany({
        where: {
          recognizable: true,
        },
      });

      return NextResponse.json(watchList);
    }

    const watchList = await prisma.watch.findMany();
    return NextResponse.json(watchList);
  } catch (error: unknown) {
    console.error("Error getting watch list", error);
    return new NextResponse(
      JSON.stringify({ message: "GET_MANY_WATCH_ERROR", error }),
      {
        status: 500,
      }
    );
  }
}
