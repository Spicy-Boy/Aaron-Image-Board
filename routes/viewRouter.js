const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage
} = require("../controllers/viewController");

router.get("/", renderCatalogPage);

router.get("/register", renderRegisterNewUserPage);

//DYNAMIC PARAMETERS MUST COME AFTER ALL NON DYNAMIC!!
router.get("/:threadNo", renderSingleThreadPage);

module.exports = router;