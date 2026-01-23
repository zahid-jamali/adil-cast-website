import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/verifyToken";
import { uploadImage } from "@/lib/uploadImage";
import Blog from "@/models/Blog";
import slugify from "slugify";

// ✅ GET SINGLE BLOG
export async function GET(request, { params }) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const blog = await Blog.findById(params.id);

  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// ✅ UPDATE BLOG
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
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    status: formData.get("status"),
    featured: formData.get("featured") === "true",
    tags: formData.get("tags")?.split(",") || [],
  };

  // 🔗 Update slug if title changes
  if (updateData.title) {
    updateData.slug = slugify(updateData.title, {
      lower: true,
      strict: true,
    });
  }

  const imageFile = formData.get("coverImage");

  // ✅ Only upload if new image is selected
  if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
    const uploaded = await uploadImage(imageFile, "adilcast/blogs");
    updateData.coverImage = uploaded.secure_url;
  }

  const updated = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return NextResponse.json(updated);
}

// ✅ DELETE BLOG
export async function DELETE(request, context) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;

  await Blog.findByIdAndDelete(id);

  return NextResponse.json({ message: "Blog deleted successfully" });
}
