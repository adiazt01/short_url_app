import prisma from "@/lib/db";
import { getUserId } from "@/lib/auth";

export const getUrlsByUserId = async () => {
  const userId = await getUserId();

  const urls = await prisma.url.findMany({
    where: {
      userId: userId,
    },
    take: 9,
  });

  return urls;
};
