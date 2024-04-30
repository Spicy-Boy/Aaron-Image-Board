const multer = require("multer");

// vv for local directory creation
const fs = require("fs");

//MULTER middleware, choose destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        let filePath;
        if (req.params.threadNo)
        {
            filePath = `public/uploads/${req.params.threadNo}`;
        }
        else 
        {
            filePath = `public/uploads/OP-images`;
        }


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

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

//     if (allowedTypes.includes(file.mimetype)) 
//     {
//         //not sure about this callback stuff lmao
//         cb(null, true); //accepts file
//     } 
//     else 
//     {
//         cb('SORRY! Are you sure uploaded file is an image?..', false); //rejection
//     }
// }

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    
        if (allowedTypes.includes(file.mimetype)) 
        {
            //not sure about this callback stuff lmao
            cb(null, true); //accepts file
        } 
        else 
        {
            const error = new Error('SORRY! Are you sure the uploaded file is an image?');
            error.code = 'LIMIT_FILE_TYPE'; // Custom error code
            cb(error, false); // Rejects the file
        }
    }
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

//TLDR, Aaron, you need to learn error handling and apply it consistently across the site

module.exports = upload;
    // uploadFileForPost

