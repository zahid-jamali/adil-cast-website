import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/verifyToken";
import { uploadImage } from "@/lib/uploadImage";
import Upcomingshow from "@/models/Upcomingshow";
import { Readable } from "stream";

// ✅ GET ALL
export async function GET(request) {
  // const user = verifyToken(request);
  // if (!user) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  await connectDB();
  const shows = await Upcomingshow.find().sort({ date: 1 });

  return NextResponse.json(shows);
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const date = formData.get("date");
  const status = formData.get("status");
  const imageFile = formData.get("image");

  if (!imageFile) {
    return NextResponse.json({ message: "Image is required" }, { status: 400 });
  }

  /* ===========================
     🔁 Web Stream → Node Stream
     =========================== */
  const nodeStream = Readable.fromWeb(imageFile.stream());

  // Patch stream back onto file object
  imageFile.stream = () => nodeStream;

  // ☁️ Upload (NO CHANGE to uploadImage.js)
  const uploaded = await uploadImage(imageFile);

  const show = await Upcomingshow.create({
    title,
    description,
    category,
    date,
    status,
    image: uploaded.secure_url,
  });

  return NextResponse.json(show, { status: 201 });
}
