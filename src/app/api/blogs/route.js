import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/verifyToken";
import { uploadImage } from "@/lib/uploadImage";
import Blog from "@/models/Blog";
import slugify from "slugify";
import { Readable } from "stream";

// ✅ GET ALL BLOGS (Admin)
export async function GET(request) {
  //   const user = verifyToken(request);
  //   if (!user) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  await connectDB();

  const blogs = await Blog.find().sort({ publishedAt: -1 });

  return NextResponse.json(blogs);
}

// ✅ CREATE BLOG
export async function POST(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const formData = await request.formData();

  const imageFile = formData.get("coverImage");
  if (!imageFile || imageFile.size === 0) {
    return NextResponse.json(
      { message: "Cover image required" },
      { status: 400 }
    );
  }

  // 🔥 FIX STARTS HERE
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const nodeFile = {
    stream: () => Readable.from(buffer),
  };

  const uploaded = await uploadImage(nodeFile, "adilcast/blogs");
  // 🔥 FIX ENDS HERE
  const title = formData.get("title");
  const slug = slugify(title, {
    lower: true,
    strict: true,
  });

  const blog = await Blog.create({
    title,
    slug,
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    status: formData.get("status"),
    coverImage: uploaded.secure_url,
  });

  return NextResponse.json(blog, { status: 201 });
}
