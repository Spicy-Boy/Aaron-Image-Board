const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage,
    logoutUser,
    renderUserPortal,
    renderFileNotFoundPage,
    renderErrorPage,
    renderAdminCavernPage,
    renderAdminLoginPage
} = require("../controllers/viewController");

const {
    requireAuth,
    isLoggedIn, //isLoggedIn is actually attachActiveUserSession
    isUserAdmin
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, renderCatalogPage);
router.get("/catalog", isLoggedIn, renderCatalogPage);

router.get("/register", isLoggedIn, renderRegisterNewUserPage);

router.get("/login", isLoggedIn, renderLoginPage);

router.get("/logout", logoutUser);

router.get("/user-portal", requireAuth, renderUserPortal);

router.get("/admin-cavern-entrance", requireAuth, isLoggedIn, renderAdminLoginPage);
//to access the admin page, seek the cavern!
//uses the isUserAdmin auth middleware to check if user has a valid admin session to access this page >:)
router.get("/admin-cavern", requireAuth, isLoggedIn, isUserAdmin, renderAdminCavernPage);

router.get("/error", isLoggedIn, renderErrorPage);

// COMMENTED out because it was preventing api calls--going to have to find a better way to handle random file not found problems
// router.get("*", isLoggedIn, renderFileNotFoundPage);

//DYNAMIC PARAMETERS MUST COME AFTER ALL NON DYNAMIC!!
router.get("/thread/:threadNo", isLoggedIn, renderSingleThreadPage);

module.exports = router;