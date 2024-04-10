const mongoose = require("mongoose");

const postNoSchema = new mongoose.Schema({
    number: {
        type: Number,
        default: 0,
        required: true
    }
});

const PostNo = mongoose.model("postNo", postNoSchema);

module.exports = PostNo;