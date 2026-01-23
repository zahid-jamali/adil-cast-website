import { connectDB } from "@/lib/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/verifyToken"; // assumed

/* ===================== GET ALL USERS (ADMIN ONLY) ===================== */
export async function GET(request) {
  await connectDB();

  const authUser = verifyToken(request);
  if (!authUser || !authUser.role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const users = await User.find().select("-password");
  return NextResponse.json(users);
}

/* ===================== CREATE USER (ADMIN ONLY) ===================== */
export async function POST(request) {
  try {
    await connectDB();

    const authUser = verifyToken(request);
    if (!authUser || !authUser.role) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password, isAdmin } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ===================== DELETE USER (ADMIN ONLY) ===================== */
export async function DELETE(request) {
  await connectDB();

  const authUser = verifyToken(request);
  if (!authUser || !authUser.isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "User ID required" }, { status: 400 });
  }

  await User.findByIdAndDelete(userId);
  return NextResponse.json({ message: "User deleted successfully" });
}
