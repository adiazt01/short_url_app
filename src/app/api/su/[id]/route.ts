import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const { id } = route.params;

  const url = await prisma.url.findUnique({
    where: {
      shortUrl: id,
    },
  });

  if (!url) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  const userAgent = req.headers.get("user-agent");
  const ip = req.headers.get("x-real-ip");
  const referer = req.headers.get("referer");

  const registerClick = await prisma.click.create({
    data: {
      urlId: url.id,
      userAgent: userAgent,
      ip: ip,
      referer: referer,
    },
  });

  return NextResponse.redirect(url.url);
}
