const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage
} = require("../controllers/viewController");

router.get("/", renderCatalogPage);

router.get("/register", renderRegisterNewUserPage);

router.get("/login", renderLoginPage)

//DYNAMIC PARAMETERS MUST COME AFTER ALL NON DYNAMIC!!
router.get("/:threadNo", renderSingleThreadPage);

module.exports = router;