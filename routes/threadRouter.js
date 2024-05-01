const router = require("express").Router();

const upload = require("../middlewares/multer");
// const uploadFileForPost = require("../middlewares/multer");

const multer = require('multer');

const {
    getAllThreads,
    createOneThread,
    createPostInThread
} = require("../controllers/threadController");

router.get("/getThread", getAllThreads);

router.post("/createThread", upload.single('file'), handleUploadErrors, createOneThread);

/* attempt at error handling middleware for uploads vvv dont use!!! */
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

router.post("/createPostInThread/:threadNo", upload.single('file'), handleUploadErrors, createPostInThread);

router.put("");

function handleUploadErrors(error, req, res, next) {
    if (error instanceof multer.MulterError) 
    {
        if (error.code === 'LIMIT_FILE_SIZE') 
        {
            console.error("File size error detected:", error);
            return res.status(400).send('File too large. Maximum size allowed is 5MB.');
        }
        else {
            console.error("Unaccounted for multer error:", error);
            return res.send('An unspecified upload error occured... sorry!');
        }
    } else if (error) {
        // An unknown error occurred when uploading.
        console.error("Upload error detected, non-MulterError:", error);
        return res.send("Something really broke man!");
    }

    //everything went fine!
    next();
}

module.exports = router;