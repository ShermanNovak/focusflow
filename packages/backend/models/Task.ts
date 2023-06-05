import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    deadline: Date,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    dateCompleted: Date,
    image: {
      data: Buffer,
      contentType: String,
    },
    googleMeetURL: String,
    zoomURL: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
