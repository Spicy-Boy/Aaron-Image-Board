const router = require("express").Router();

const {
    getAllThreads,
    createOneThread,
} = require("../controllers/threadController");

router.get("/getThread", getAllThreads);
router.post("/createThread", createOneThread);

module.exports = router;