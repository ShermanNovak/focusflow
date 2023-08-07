import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
