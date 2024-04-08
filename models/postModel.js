// DEPRECATED FOR NOW!

//AARON DOES NOT USE THE POST MODEL AT THIS TIME,
/* comments are instead saved to threads as an array of objects! */
/*
comment array vvv
    posts: [{
        username: String,
        textContent: { //string of message
            type: String,
            required: true
        },
        img: String, // a URL to an image
        postNo: Number, //post number assinged to this comment
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
*/


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