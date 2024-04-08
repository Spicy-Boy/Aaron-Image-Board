const mongoose = require("mongoose");

const postNoSchema = new mongoose.Schema({
    number: Number
});

const PostNo = mongoose.model("postNo", postNoSchema);

module.exports = PostNo;