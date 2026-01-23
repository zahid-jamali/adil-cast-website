import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/verifyToken";
import { uploadImage } from "@/lib/uploadImage";
// import UpcomingShow from "@/models/UpcomingShow";
import Upcomingshow from "@/models/Upcomingshow";

// ✅ GET ONE
export async function GET(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const show = await UpcomingShow.findById(id);

  if (!show) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(show);
}

// ✅ UPDATE
export async function PUT(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await context.params;
  const formData = await request.formData();

  const updateData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    date: formData.get("date"),
    status: formData.get("status"),
  };

  const imageFile = formData.get("image");

  // ✅ ONLY upload if a REAL image is selected
  if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
    const uploaded = await uploadImage(imageFile);
    updateData.image = uploaded.secure_url;
  }

  const updated = await Upcomingshow.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return NextResponse.json(updated);
}

// ✅ DELETE
export async function DELETE(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await connectDB();
  await Upcomingshow.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted successfully" });
}
