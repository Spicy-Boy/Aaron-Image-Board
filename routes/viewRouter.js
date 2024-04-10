const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage,
    logoutUser
} = require("../controllers/viewController");

const {
    isLoggedIn
} = require("./authMiddleware");

router.get("/", isLoggedIn, renderCatalogPage);

router.get("/register", isLoggedIn, renderRegisterNewUserPage);

router.get("/login", isLoggedIn, renderLoginPage);

router.get("/logout", logoutUser)

//DYNAMIC PARAMETERS MUST COME AFTER ALL NON DYNAMIC!!
router.get("/:threadNo", isLoggedIn, renderSingleThreadPage);

module.exports = router;