import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Contact from "@/models/Contact";
import { verifyToken } from "@/lib/verifyToken";

/**
 * 🔐 ADMIN: Get single message
 */
export async function GET(request, { params }) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const message = await Contact.findById(params.id);

  if (!message) {
    return NextResponse.json({ message: "Message not found" }, { status: 404 });
  }

  return NextResponse.json(message);
}

/**
 * 🔐 ADMIN: Mark as read/unread
 */
export async function PUT(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const { isRead } = await request.json();

  const updated = await Contact.findByIdAndUpdate(
    id,
    { isRead },
    { new: true }
  );

  return NextResponse.json(updated);
}

/**
 * 🔐 ADMIN: Delete message
 */
export async function DELETE(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;

  await Contact.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Message deleted successfully",
  });
}
