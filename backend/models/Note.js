import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Schema for notes: title, content, tags, isPinned, userId & timestamps
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // This automatically adds 'createdAt' and 'updatedAt' fields.
  },
);

export default mongoose.model("Note", noteSchema);
