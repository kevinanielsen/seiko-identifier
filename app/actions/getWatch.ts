import prisma from "@/app/libs/prismadb";

const getWatch = async (ref: string) => {
  try {
    const watch = await prisma.watch.findFirst({
      where: {
        ref: ref,
      },
    });

    return watch;
  } catch (error: unknown) {
    console.error("Error getting watch", error);
    return null;
  }
};

export default getWatch;
