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
      type: String
    },
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
