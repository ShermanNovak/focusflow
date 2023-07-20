import mongoose from "mongoose";

const Schema = mongoose.Schema;

const highlightSchema = new Schema(
    {
        content: {
            type: String,
            default: ""
        },

        date: {
            type: Date,
        }
    }, { timestamps: true })

    module.exports = mongoose.model("Highlight", highlightSchema);
