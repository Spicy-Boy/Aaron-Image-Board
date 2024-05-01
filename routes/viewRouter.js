const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage,
    logoutUser,
    renderUserPortal,
    renderFileNotFoundPage,
    renderErrorPage
} = require("../controllers/viewController");

const {
    requireAuth,
    isLoggedIn
} = require("./authMiddleware");

router.get("/", isLoggedIn, renderCatalogPage);
router.get("/catalog", isLoggedIn, renderCatalogPage);

router.get("/register", isLoggedIn, renderRegisterNewUserPage);

router.get("/login", isLoggedIn, renderLoginPage);

router.get("/logout", logoutUser);

router.get("/user-portal", requireAuth, renderUserPortal)

//DYNAMIC PARAMETERS MUST COME AFTER ALL NON DYNAMIC!!
router.get("/thread/:threadNo", isLoggedIn, renderSingleThreadPage);

router.get("/error", isLoggedIn, renderErrorPage);

router.get("*", isLoggedIn, renderFileNotFoundPage);

module.exports = router;