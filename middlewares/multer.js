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
const upload = multer({storage: storage});

module.exports = upload;
