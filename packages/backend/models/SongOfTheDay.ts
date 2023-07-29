import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sotdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("SongOfTheDay", sotdSchema);
