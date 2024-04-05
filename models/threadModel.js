const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const threadSchema = new mongoose.Schema({
    title: String,
    author: String,
    posts: [{
        type: ObjectId,
        ref: "posts"
    }]
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;