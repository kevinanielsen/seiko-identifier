import prisma from "@/app/libs/prismadb";

const getWatch = async (ref: string) => {
  try {
    const watch = await prisma.watch.findFirst({
      where: {
        ref: ref,
      }
    });

    return watch;
  } catch (error: any) {
    return error;
  }
}

export default getWatch;