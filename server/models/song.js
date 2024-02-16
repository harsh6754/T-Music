//const { timeStamp } = require("console");
const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        album: {
            type: String,
            // required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },

    },
    { timeStamp: true }
);

module.export = mongoose.model("song", songSchema);