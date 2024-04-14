import prisma from "@/lib/db";
import { getUserId } from "@/lib/auth";

export const getDashboardUrls = async () => {
  const userId = await getUserId();

  // If the user is not logged in, return an empty array
  if (!userId) {
    return [];
  }

  // Get the urls for the user
  const urls = await prisma.url.findMany({
    where: {
      userId: userId,
    },
    include:{
      group: true,
      clicks: true,
    },
    take: 6,
  });

  return urls;
};


