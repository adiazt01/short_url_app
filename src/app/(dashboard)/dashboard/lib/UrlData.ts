import prisma from "@/lib/db";
import { getUserId } from "@/lib/auth";

export const getUrlsByUserId = async () => {
  const userId = await getUserId();

  const urls = await prisma.url.findMany({
    where: {
      userId: userId,
    },
    include:{
      group: true,
      clicks: true,
    },
    take: 9,
  });

  console.log(urls);

  return urls;
};
