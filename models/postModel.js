const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema(
    {
        username: String,
        textContent: {
            type: String,
            required: true
        },
        img: String,
        thread: {
            type: ObjectId,
            ref: "threads"
        }
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;