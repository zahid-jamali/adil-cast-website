import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export async function GET(request) {
  const user = verifyToken(request);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ health: "Its okay" });
}
