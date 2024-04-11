"use server";

import { auth } from "../../../../../auth";
import { urlSchema } from "../_schemas/FormSchemas";
import prisma from "@/lib/db";

export type FormState = {
  message: string;
  data: {
    url: string;
    shortUrl: string;
    userId: number;
  };
};

export async function getUserId(): Promise<number> {
  const user = await auth();

  if (!user?.user?.sub) {
    throw new Error("User not found");
  }

  return parseInt(user?.user?.sub);
}

export async function createShortUrlAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = urlSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const userId = await getUserId();

  const newUrl = await prisma.url.create({
    data: {
      url: parsed.data.url,
      shortUrl: parsed.data.shortUrl,
      userId: userId,
    },
  });

  return {
    message: "Short URL created successfully",
    data: newUrl,
  };
}
