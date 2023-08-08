import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String
    },
    type: String,
    dateCompleted: Date,
    deadline: Date,
    startTime: Date,
    endTime: Date,
    location: String,
    googleMeet: String,
    guests: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
