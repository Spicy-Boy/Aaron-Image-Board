const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage,
    logoutUser,
    renderUserPortal
} = require("../controllers/viewController");

const {
    requireAuth,
    isLoggedIn
} = require("./authMiddleware");

router.get("/", isLoggedIn, renderCatalogPage);

router.get("/register", isLoggedIn, renderRegisterNewUserPage);

router.get("/login", isLoggedIn, renderLoginPage);

router.get("/logout", logoutUser);

router.get("/user-portal", requireAuth, renderUserPortal)

//DYNAMIC PARAMETERS MUST COME AFTER ALL NON DYNAMIC!!
router.get("/:threadNo", isLoggedIn, renderSingleThreadPage);

module.exports = router;