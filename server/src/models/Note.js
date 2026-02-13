import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    // Reference to the user who created the note
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    // Type of note: either a simple text note or a checklist
    type: {
      type: String,
      enum: ["text", "checklist"],
      default: "text",
    },
    // Content for text notes
    text: {
      type: String,
    },
    // items for checklist notes
    checklist: [
      {
        text: String,
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    // Pinned notes appear at the top
    isPinned: {
      type: Boolean,
      default: false,
    },
    // Archived notes are hidden from the main view but not deleted
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    // Ensure virtuals are included in JSON output
    // and replace _id with id for better frontend compatibility
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
