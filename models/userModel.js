const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // vv array of threadNos that user has posted to
    threadsInteractedWith: [Number],
    // vv array of postNos that user has submitted
    threadsInteractedWith: [Number],
});

const User = mongoose.model("User", userSchema);

module.exports = User;