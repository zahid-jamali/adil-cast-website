import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    youtubeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["podcast", "show", "clip"],
      default: "podcast",
      required: true,
    },

    // Reference to Show (optional)
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      default: null,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      trim: true,
    },

    duration: {
      type: Number, // duration in seconds
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.Podcast ||
  mongoose.model("Podcast", PodcastSchema);
