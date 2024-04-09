const router = require("express").Router();

const {
    getAllThreads,
    createOneThread,
    createPostInThread
} = require("../controllers/threadController");

router.get("/getThread", getAllThreads);
router.post("/createThread", createOneThread);
router.post("/createPostInThread/:threadNo", createPostInThread);

module.exports = router;