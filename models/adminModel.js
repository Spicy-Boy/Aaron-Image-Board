// STUB! unused! for now ;)

const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // vv array of threadNos that user has posted to
    threadsCreated: [Number],
    // vv array of postNos that user has submitted
    postsCreated: [Number],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("Admin", adminSchema);

module.exports = User;