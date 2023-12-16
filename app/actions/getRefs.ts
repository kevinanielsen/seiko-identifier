import prisma from "@/app/libs/prismadb";

const getRefs = async () => {
  try {
    const refList = await prisma.watch.findMany({
      select: {
        ref: true,
      },
    });

    return refList;
  } catch (error: unknown) {
    return error;
  }
};

export default getRefs;
