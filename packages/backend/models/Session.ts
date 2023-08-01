import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    startTime: Date,
    endTime: Date,
    duration: Number,
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Session", sessionSchema);
