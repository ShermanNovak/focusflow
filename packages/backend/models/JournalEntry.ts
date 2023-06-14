import mongoose from "mongoose";

const Schema = mongoose.Schema;

const journalEntrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    photoURL: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
