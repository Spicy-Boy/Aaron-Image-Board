const router = require("express").Router();

const {
    registerNewUser,
    loginUser
    // logoutUser
} = require("../controllers/userController");

//localhost:8080/api/users/registerNewUser
router.post("/registerNewUser", registerNewUser);

router.post("/loginUser", loginUser);

// router.post("/logoutUser", logoutUser);

module.exports = router;