const mongoose = require("mongoose");

const threadNoSchema = new mongoose.Schema({
    number: Number
});

const ThreadNo = mongoose.model("threadNo", threadNoSchema);

module.exports = ThreadNo;