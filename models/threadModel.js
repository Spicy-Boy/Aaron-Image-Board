const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const threadSchema = new mongoose.Schema({
    title: String,
    author: String,
    posts: [{
        username: String,
        textContent: { //string of message
            type: String,
            default: "",
        },
        img: String, // a URL to an image
        imgSize: Number,
        imgWidth: Number,
        imgHeight: Number,
        imgFileType: String,
        postNo: {
            type: Number, //post number assinged to this comment
            default: -1 
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    threadNo: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastCommentAt: {
        type: Date,
        // default: Date.now()
    }
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;