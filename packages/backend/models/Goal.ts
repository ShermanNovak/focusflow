import mongoose from "mongoose";

const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
