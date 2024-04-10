const router = require("express").Router();

const {
    registerNewUser
} = require("../controllers/userController");

//localhost:8080/api/users/registerNewUser
router.post("/registerNewUser", registerNewUser);

module.exports = router;