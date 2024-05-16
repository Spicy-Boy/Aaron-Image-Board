// Admin Router: routes admin commands related to editing and deleting posts (and their respecting images) from the database
//ALSO concerns the banning of ips and users

const router = require("express").Router();
// const multer = require('multer');

const {
    unlistOneThread,
    deleteOneThread,
    pinOneThread,
    unlistOnePost,
    deleteOnePost,
    editOnePost,
    createAdminSession,
    terminateAdminSession
} = require("../controllers/adminController");

router.post("/unlistThread/:threadNo", unlistOneThread);

router.delete("/deleteThread/:threadNo", deleteOneThread);

router.post("/pinThread/:threadNo", pinOneThread);

router.post("/unlistPost/:threadNo/:postNo", unlistOnePost);

router.delete("/deletePost/:threadNo/:postNo", deleteOnePost);

router.post("/editPost/:threadNo/:postNo", editOnePost);

// >_< /admin/createAdminSession vvv
router.post("/createAdminSession", createAdminSession);

router.post("/terminateAdminSession", terminateAdminSession);

module.exports = router;

