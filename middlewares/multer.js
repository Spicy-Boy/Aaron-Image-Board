const multer = require("multer");

// vv for local directory creation
const fs = require("fs");

//MULTER middleware, choose destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        let filePath = `public/uploads/${req.params.threadNo}`;

        if (!fs.existsSync(filePath))
        {
            fs.mkdirSync(filePath, {recursive: true});
        }

        // cb(null, 'uploads/${threadNo}');
        cb(null, filePath);
    },
    filename: (req, file, cb) =>
    {
        cb(null, file.originalname);
    }
});

//set limits on file size to be uploaded
const limits = {
    //5 * 1024 * 1024 is 5MB limit on file size
    fileSize: 5 * 1024 * 1024
};

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) 
    {
        //not sure about this callback stuff lmao
        cb(null, true); //accepts file
    } 
    else 
    {
        cb(new Error('SORRY! Uploaded file is not an image..'), false); //rejection
    }
}

const upload = multer({
    storage: storage,
    limits: limits,
    // fileFilter: fileFilter
});

// const uploadFileForPost = upload.single("file");

//for tips on setting up a custom multer function:
//https://stackoverflow.com/questions/30838901/error-handling-when-uploading-file-using-multer-with-expressjs
//DOES NOT WORK RIGHT NOW!!!!!!!!!!
// function uploadFileForPost( req, res, next ) {

//     upload.single('file')
//     (req, res, (error) => {
//         if (error instanceof multer.MulterError)
//         {
//             console.error("uploadFileForPost failed:", error);
//             res.send("A multer error occured during upload!");
//         } else if (error) {
//             res.send("Something ?? went wrong during the upload!");
//         }
//         // Everything went fine, continue down the chain
//         return next();
//     });

// }

module.exports = upload;
    // uploadFileForPost

