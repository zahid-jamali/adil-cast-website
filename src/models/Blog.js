import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    content: {
      type: String, // HTML or Markdown
      required: true,
    },

    coverImage: {
      type: String, // Cloudinary URL
      required: true,
    },

    author: {
      type: String,
      default: "Adil Cast",
    },

    category: {
      type: String,
      required: true,
      trim: true,
      // e.g. Society, Crime, Politics, Human Stories
    },

    tags: {
      type: [String],
      default: [],
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
