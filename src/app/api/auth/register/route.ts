import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(request: NextRequest) {
  // Extract the email, password, and username from the request body
  const { email, password, username } = await request.json();

  // Check if the user already exists
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  // If the user already exists, return an error message
  if (userExists) {
    return NextResponse.json({
      message: "User already exists",
    });
  }

  // Hashed the password
  const hashedPassword = await argon2.hash(password);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  console.log(newUser);

  // Return the new user
  return NextResponse.json(newUser);
}
