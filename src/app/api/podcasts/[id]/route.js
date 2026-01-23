import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/verifyToken";

import Podcast from "@/models/Podcast";

// ✅ GET ONE PODCAST
export async function GET(request, { params }) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const podcast = await Podcast.findById(params.id).populate("showId", "title");

  if (!podcast) {
    return NextResponse.json({ message: "Podcast not found" }, { status: 404 });
  }

  return NextResponse.json(podcast);
}

// ✅ UPDATE PODCAST
export async function PUT(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const body = await request.json();

  const podcast = await Podcast.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!podcast) {
    return NextResponse.json({ message: "Podcast not found" }, { status: 404 });
  }

  return NextResponse.json(podcast);
}

// ✅ DELETE PODCAST
export async function DELETE(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const podcast = await Podcast.findByIdAndDelete(id);

  if (!podcast) {
    return NextResponse.json({ message: "Podcast not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Podcast deleted successfully",
  });
}
