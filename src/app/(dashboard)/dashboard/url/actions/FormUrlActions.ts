"use server";

import { getUserId } from "@/lib/auth";
import { urlSchema, groupSchema } from "../schemas/FormSchemas";
import * as argon2 from "argon2";
import prisma from "@/lib/db";
import validUrl from "valid-url";
import { Group } from "@prisma/client";

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

    if (!userId) {
      throw new Error("User not found");
    }

    // if the field group is not empty, get the group ID
    if (parsed.data.group || parsed.data.group !== "") {
      const group = await prisma.group.findFirst({
        where: { id: parseInt(parsed.data.group), userId: userId },
      });

      if (!group) {
        throw new Error("Group not found");
      }

      // Create the short URL
      const newUrl = await prisma.url.create({
        data: {
          url: parsed.data.url,
          shortUrl,
          userId,
          groupId: group.id,
        },
      });

      // Return the response
      return {
        message: "Short URL created successfully",
        data: newUrl,
      };
    } else {
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
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      data: null,
    };
  }
}

export type FormCreateUrlState = {
  message: string;
  data: Group | null;
};

export async function createGroupAction(
  data: FormData
): Promise<FormCreateUrlState> {
  try {
    // Parse the form data
    const formData = Object.fromEntries(data);
    const parsed = groupSchema.safeParse(formData);

    // Verify if the form data is valid
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }

    // Get the user ID
    const userId = await getUserId();

    // Check if the user ID exists
    if (!userId) {
      throw new Error("User not found");
    }

    // Check if the group already exists
    const existingGroup = await prisma.group.findFirst({
      where: { name: parsed.data.group, userId: userId },
    });

    // If the group already exists, return an error
    if (existingGroup) {
      throw new Error("Group already exists, the group name must be unique");
    }

    // Create the group
    const newGroup = await prisma.group.create({
      data: {
        name: parsed.data.group,
        userId,
      },
    });

    // Return the response
    return {
      message: "Group created successfully",
      data: newGroup,
    };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
}
