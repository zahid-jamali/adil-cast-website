import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Contact from "@/models/Contact";
import { verifyToken } from "@/lib/verifyToken";

/**
 * ✅ PUBLIC: Submit contact form
 */
export async function POST(request) {
  await connectDB();

  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const contact = await Contact.create({
    name,
    email,
    message,
  });

  return NextResponse.json(
    { message: "Message sent successfully" },
    { status: 201 }
  );
}

/**
 * 🔐 ADMIN: Get all contact messages
 */
export async function GET(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const messages = await Contact.find().sort({ createdAt: -1 });

  return NextResponse.json(messages);
}
