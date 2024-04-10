const mongoose = require("mongoose");

const threadNoSchema = new mongoose.Schema({
    number: {
        type: Number,
        default: 0,
        required: true
    }
});

const ThreadNo = mongoose.model("threadNo", threadNoSchema);

module.exports = ThreadNo;