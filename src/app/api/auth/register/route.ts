import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
    console.log(body);
  return NextResponse.json(body);
}
