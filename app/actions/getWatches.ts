import prisma from "@/app/libs/prismadb"

const getWatches = async (count: number, page: number) => {
  try {
    const watchList = await prisma.watch.findMany({
      take: count,
      skip: count * page - count,
    })

    return watchList
  } catch (error: any) {
    return error;
  }
}

export default getWatches;
