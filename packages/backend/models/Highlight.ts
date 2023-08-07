import mongoose from "mongoose";

const Schema = mongoose.Schema;

const highlightSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    }, { timestamps: true })

module.exports = mongoose.model("Highlight", highlightSchema);