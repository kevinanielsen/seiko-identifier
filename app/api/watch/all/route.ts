import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: NextRequest) {
  const count = Number(request.nextUrl.searchParams.get("count"));
  const page = Number(request.nextUrl.searchParams.get("page"));
  
  try {
    if (count && page) {
      const watchList = await prisma.watch.findMany({
        take: count,
        skip: count * page - count,
      })

      return NextResponse.json(watchList);
    }
    
    const watchList = await prisma.watch.findMany()
    return NextResponse.json(watchList);
    
  } catch (error: any) {
    return new NextResponse("GET_MANY_WATCH_ERROR", { status: 500, statusText: error });
  }
}