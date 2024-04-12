"use server";

import { getUserId } from "@/lib/auth";
import { urlSchema } from "../schemas/FormSchemas";
import * as argon2 from "argon2";
import prisma from "@/lib/db";
import validUrl from "valid-url";

export type FormState = {
  message: string;
  data: {
    url: string;
    shortUrl: string;
    userId: number;
  } | null;
};

export async function createShortUrlAction(data: FormData): Promise<FormState> {
  try {
    // Parse the form data
    const formData = Object.fromEntries(data);
    const parsed = urlSchema.safeParse(formData);

    // Verify if the form data is valid
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }

    // Verify if the URL is valid
    if (!validUrl.isUri(parsed.data.url)) {
      throw new Error("Invalid URL");
    }

    // Hash the URL
    const hashUrl = await argon2.hash(parsed.data.url);
    let shortUrl = hashUrl.substring(7, 14);

    // Check if the short URL already exists
    let existingUrl = await prisma.url.findUnique({ where: { shortUrl } });

    // If the short URL already exists, generate a new one
    let index = 14;
    while (existingUrl) {
      shortUrl = hashUrl.substring(index, index + 7);
      existingUrl = await prisma.url.findUnique({ where: { shortUrl } });
      index += 7;
    }

    // Get the user ID
    const userId = await getUserId();

    // Create the short URL
    const newUrl = await prisma.url.create({
      data: {
        url: parsed.data.url,
        shortUrl,
        userId,
      },
    });

    // Return the response
    return {
      message: "Short URL created successfully",
      data: newUrl,
    };
  } catch (error) {
    return {
      message: (error as Error).message,
      data: null,
    };
  }
}
