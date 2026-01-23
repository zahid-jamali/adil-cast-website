import mongoose from "mongoose";

const UpcomingShowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String, // image URL or path
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      // examples: Originals, Interviews, Special
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["coming soon", "scheduled"],
      default: "coming soon",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.UpcomingShow ||
  mongoose.model("UpcomingShow", UpcomingShowSchema);
