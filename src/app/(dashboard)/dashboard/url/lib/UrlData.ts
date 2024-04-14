import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { Url } from "@prisma/client";

type UrlPaginationResult = {
  urls?: Url[] | [];
  totalPages: number;
};

export const getUrlsWithPagination = async (page: number, limit: number, query: string):Promise<UrlPaginationResult> => {
  const userId = await getUserId();
  // If the user is not logged in, return an empty array
  if (!userId) {
    throw new Error("User not logged in");
  }

  // Get the total count of urls for the user
  const totalCount = await prisma.url.count({
    where: {
      userId: userId,
      OR: [
        {
          url: {
            contains: query,
          },
        },
        {
          shortUrl: {
            contains: query,
          },
        },
      ],
    },
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  // Get the urls for the user
  const urls = await prisma.url.findMany({
    where: {
      userId: userId,
      OR: [
        {
          url: {
            contains: query,
          },
        },
        {
          shortUrl: {
            contains: query,
          },
        },
      ],
    },
    include: {
      group: true,
      clicks: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return { urls, totalPages };
};