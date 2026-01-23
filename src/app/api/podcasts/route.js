import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/verifyToken";
import Podcast from "@/models/Podcast";

// ✅ GET ALL PODCASTS
export async function GET(request) {
  //   const user = verifyToken(request);
  //   if (!user) {
  //     return NextResponse.json(
  //       { message: "Unauthorized" },
  //       { status: 401 }
  //     );
  //   }

  await connectDB();
  const podcasts = await Podcast.find().sort({ publishedAt: -1 });

  return NextResponse.json(podcasts);
}

// ✅ CREATE PODCAST
export async function POST(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();

  const podcast = await Podcast.create(body);

  return NextResponse.json(podcast, { status: 201 });
}
