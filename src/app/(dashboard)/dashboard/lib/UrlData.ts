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

export const getTotalClicks = async () => {
  const userId = await getUserId();

  // If the user is not logged in, return 0
  if (!userId) {
    return 0;
  }

  // Get the total number of clicks for the user
  const totalClicks = await prisma.click.count({
    where: {
      url: {
        userId: userId,
      },
    },
  });

  return totalClicks;
}

export const getTotalUrlsCreated = async () => {
  const userId = await getUserId();

  // If the user is not logged in, return 0
  if (!userId) {
    return 0;
  }

  // Get the total number of urls created by the user
  const totalUrlsCreated = await prisma.url.count({
    where: {
      userId: userId,
    },
  });

  return totalUrlsCreated;
}