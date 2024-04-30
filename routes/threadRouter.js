const router = require("express").Router();

const upload = require("../middlewares/multer");
// const uploadFileForPost = require("../middlewares/multer");

const {
    getAllThreads,
    createOneThread,
    createPostInThread
} = require("../controllers/threadController");

router.get("/getThread", getAllThreads);

router.post("/createThread", upload.single('file'), createOneThread);
// router.post("/createThread", upload.single('file')(req, res, (error) => {
//     if (error instanceof multer.MulterError)
//     {
//         console.error("uploadFileForPost failed:", error);
//         res.send("A multer error occured during upload!");
//     } else if (error) {
//         res.send("Something ?? went wrong during the upload!");
//     }
//     // Everything went fine, continue down the chain
//     return next();
// }), createOneThread);
router.post("/createPostInThread/:threadNo", upload.single('file'), createPostInThread);

module.exports = router;