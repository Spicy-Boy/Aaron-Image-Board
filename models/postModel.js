const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    username: String,
    textContent: {
        type: String,
        required: true
    },
    // vvv img is a url to user uploaded image
    img: String,
    thread: {
        type: ObjectId,
        ref: "threads"
    },
    replyingTo: {
        type: ObjectId,
        ref: "posts"
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;