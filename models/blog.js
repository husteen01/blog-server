//title, description, tags, createdby

const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a blog title"]
    },
    description: {
        type: String,
        required: [true, "Please provide the description"]
    },
    tag: {
        type: String,
        enum: ["Nature", "Lifestyle", "Technology", "Sport"]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the blog writer"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);