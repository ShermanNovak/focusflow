import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
        type: String
    },
    startDateTime: {
        type: Date
    },
    endDateTime: {
        type: Date
    },
    hangoutLink: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
