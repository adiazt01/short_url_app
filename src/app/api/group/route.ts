import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const useId = await getUserId();

  if (!useId) {
    return NextResponse.json({ message: "No credentials provided" }, {
        status: 401,
    }); 
  }

  try {
    const groups = await prisma.group.findMany({
      where: { userId: useId },
    });

    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.error(error);
  }
}
