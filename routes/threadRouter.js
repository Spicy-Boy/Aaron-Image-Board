const router = require("express").Router();

const upload = require("../middlewares/multer");

const {
    getAllThreads,
    createOneThread,
    createPostInThread
} = require("../controllers/threadController");

router.get("/getThread", getAllThreads);
router.post("/createThread", createOneThread);
router.post("/createPostInThread/:threadNo", upload.single('file'), createPostInThread);

module.exports = router;