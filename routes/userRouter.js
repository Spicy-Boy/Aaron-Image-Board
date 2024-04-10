const router = require("express").Router();

const {
    registerNewUser,
    loginUser
} = require("../controllers/userController");

//localhost:8080/api/users/registerNewUser
router.post("/registerNewUser", registerNewUser);

router.post("/loginUser", loginUser)

module.exports = router;